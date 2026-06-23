---
title: 'Im-evaluation-harness 问题'
description: 'study notes'
publishDate: 2026-05-20
category: other
tags: []
---

怎么使用？
安装 git clone （但其实不需要，可以直接pip install）

Installing Model Backends 是什么
答：上面那个 git clone 和 pip install -e . 只安装了框架，还需要单独安装模型后端

有好多模型，如
- HuggingFace transformers models
- vLLM inference
- API-based models
这些用各自的方法安装模型后端，多个后端可以同时安装

接下来就可以使用了

HuggingFace transformers models 指的是什么？
答：本地模型，但**模型权重文件本身并不包含模型的结构定义**
当初用 `transformers` 库的结构装入模型进行训练，训练后参数保存到本地，然后评测时再用 `transformers` 库规定的结构读取参数进行评测，当然也可以改变结构
如果在训练时，直接修改了 `transformers` 类的内部代码（比如给 `LlamaForCausalLM` 多加了一个自定义层），那仅仅保存权重就不够了，因为标准库的蓝图里没这个层。
此时，需要把自定义模型代码也保存下来，并且在加载时通过 `trust_remote_code=True` 或者直接 `AutoModel.from_pretrained("your-model-path", trust_remote_code=True)` 来告诉库：“除了标准蓝图，还要用我自己写的那个扩展蓝图”。加载时会去找模型目录下的 `modeling_xxx.py` 文件。

问：vLLM 是什么？
vLLM 不会重新定义模型结构，它复用的就是用 `transformers` 库保存的 `config.json` 和权重文件。但当一个请求到达时，它内部的“生产工艺”完全不同。
关键优化：
1. PagedAttention：显存管理革命
2. Continuous Batching：连续批处理

问：vLLM 不是也是conda安装的东西吗，我的理解中这种东西都是软件，怎么能决定硬件呢？
它构建了一个“块池”，自己分配页，（就像 Nachos 那样？）
- **传统方式 (`transformers`)**：直接向系统请求一个 `[batch_size, max_seq_len, ...]` 的大张量，系统必须找到连续的显存。内存**碎片**（多次申请释放后）一多，分配失败就 OOM。
- **vLLM 的内部方式**：只向系统请求一次大块池，后续所有分配都走自己的 `allocate`/`free`。因为每个请求的 KV Cache 都被打散成了固定大小的块，**碎片被彻底消灭了**。任何释放出的块都能立刻重用，显存利用率可以无限接近 100%。

问：Llama 是什么？
Large Language Model Meta AI







