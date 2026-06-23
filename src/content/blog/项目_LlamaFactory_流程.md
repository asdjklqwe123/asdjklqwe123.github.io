---
title: 'LlamaFactory 流程'
description: 'study notes'
publishDate: 2026-05-21
category: other
tags: []
---

以 `llamafactory-cli train examples/train_lora/qwen3_lora_sft.yaml` 为例

1. 入口注册在 [pyproject.toml:79](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html)，[llamafactory-cli](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html) 实际指向 [llamafactory.cli:main](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html)。
2. [main()](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html) 在 [cli.py:1](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html) 里，只做一件事：根据环境变量决定用 v0 还是 v1，然后交给 launcher。
3. 真正的命令分发在 [launcher.py:38](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html)。当你执行 train 时，它会进入 [launcher.py:154](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html)。
4. 配置文件读取在 [parser.py:69](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html)。你给的 YAML 会被读进来，再合并命令行覆盖参数。
5. 训练总入口在 [tuner.py:127](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html)，它会调用 [tuner.py:62](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html) 做任务分流。
6. 你这个配置里 [stage: sft](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html)，所以最终会进 [workflow.py:41](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html)，这里才开始加载 tokenizer、dataset、model，构建 trainer，然后 [trainer.train()](vscode-file://vscode-app/c:/Users/xujuli/AppData/Local/Programs/Microsoft%20VS%20Code/8b640eef5a/resources/app/out/vs/code/electron-browser/workbench/workbench.html)。

### 多 GPU 运行流程：
你现在这份 LlamaFactory 的多 GPU 训练，默认走的是“自动 torchrun + DDP”这条线，不是手工多进程。入口是 src/llamafactory/cli.py 进入 src/llamafactory/launcher.py。launcher 会先看可见 GPU 数；如果大于 1 且没启用 Ray/KTransformers，就自动拼出 torchrun 命令，nproc_per_node 默认等于可见 GPU 数，master_addr 和 master_port 也会自动补齐。子进程重新执行 src/llamafactory/launcher.py 后，直接进入 run_exp()。

训练层是 src/llamafactory/train/tuner.py 里的 run_exp() 和 get_train_args()，再进入 src/llamafactory/train/sft/workflow.py 的 run_sft()。这里会把 YAML 里的模型、数据、训练参数解析成 TrainingArguments；如果是分布式且用了 LoRA，代码会自动把 ddp_find_unused_parameters 设成 False。然后 run_sft() 负责加载 tokenizer、模型和数据集，创建 CustomSeq2SeqTrainer，真正的梯度同步由 Trainer / Accelerate 完成；如果你显式启用 DeepSpeed、MCA 或 Ray，就会走对应分支。
