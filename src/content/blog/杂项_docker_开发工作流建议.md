---
title: 'docker 开发工作流建议'
description: 'study notes'
publishDate: 2026-04-27
category: other
tags: []
---

## 本地开发，云端运行（针对 LLM/深度学习）
当本地电脑配置不足（如无显卡），而服务器有高性能 GPU 时：

1.  **不要在本地构建镜像**：LLM 镜像通常很大（>5GB），上传耗时。
2.  **使用 VS Code Remote - SSH**：
    - 直接用 VS Code 连接远程服务器。
    - 在服务器上编写代码和 Dockerfile。
    - 直接在服务器终端执行 `docker build` 和 `docker run`。
3.  **Dockerfile 注意事项**：
    - 必须使用带 CUDA 支持的基础镜像，例如：`FROM pytorch/pytorch:2.1.0-cuda12.1-cudnn8-runtime`。
4.  **运行命令**：
    - 务必加上 `--gpus all` 参数，否则容器无法调用显卡。

## 灵活运行多个脚本（覆盖 CMD）
Dockerfile 中的 `CMD` 只是默认命令，可以通过以下方式灵活运行不同脚本（如 `data.py`, `train.py`）：

### 方法 A：单次运行（覆盖默认命令）
在 `docker run` 镜像名后面直接跟上你想执行的命令，这会覆盖 Dockerfile 里的 `CMD`。
```bash
# 运行数据处理脚本
docker run --gpus all -v $(pwd):/app my-llm-app python data.py

# 运行训练脚本
docker run --gpus all -v $(pwd):/app my-llm-app python train.py
```
- `-v $(pwd):/app`: **挂载卷**。将服务器当前目录挂载到容器的 `/app`，这样脚本产生的文件（模型、日志）会直接保存在服务器硬盘上，不会随容器消失。

### 方法 B：交互式模式（推荐用于调试/实验）
启动一个容器并进入其终端，像在本地一样连续执行多个命令。
```bash
# -it: 交互式终端
# /bin/bash: 启动 bash shell
docker run --gpus all -it -v $(pwd):/app my-llm-app /bin/bash
```
进入容器后：
```bash
root@container:/app# python data.py
root@container:/app# python train.py
root@container:/app# exit
```
