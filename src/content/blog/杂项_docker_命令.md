---
title: 'docker 命令'
description: 'study notes'
publishDate: 2026-04-27
category: other
tags: []
---

## 1. 构建镜像
根据当前目录的 Dockerfile 创建一个新的镜像。
```bash
docker build -t my-app .
```
- `docker`: 调用 Docker 客户端。
- `build`: 执行构建指令。
- `-t my-app`: `tag` 的缩写，给构建出的镜像起名为 `my-app`。
- `.`: 上下文路径，代表使用**当前目录**下的文件作为构建上下文。

### 指定 Dockerfile 文件名
如果你的 Dockerfile 不叫 `Dockerfile`（例如叫 `Dockerfile.llm`），需要使用 `-f` 参数指定。
```bash
docker build -f Dockerfile.llm -t my-llm-app .
```

## 2. 运行容器
启动一个镜像的实例（容器），并映射端口。
```bash
docker run -p 5000:5000 my-app
```
- `docker`: 调用 Docker 客户端。
- `run`: 创建并启动一个新的容器。
- `-p 5000:5000`: `publish` 的缩写，端口映射。格式为 `主机端口:容器端口`。
- `my-app`: 要运行的镜像名称。

## 3. 查看镜像
列出本地下载或构建好的所有镜像。
```bash
docker images
```
- `docker`: 调用 Docker 客户端。
- `images`: 列出镜像命令。

## 4. 查看容器
列出所有容器（包括正在运行和已停止的）。
```bash
docker ps -a
```
- `docker`: 调用 Docker 客户端。
- `ps`: `process status` 的缩写，查看容器进程。
- `-a`: `all` 的缩写，显示所有容器，不仅是运行中的。

## 5. 删除容器
删除一个或多个停止状态的容器。
```bash
docker rm <container_id>
```
- `docker`: 调用 Docker 客户端。
- `rm`: `remove` 的缩写，删除容器。
- `<container_id>`: 容器的唯一 ID（可以通过 `docker ps -a` 查看）。

## 6. 删除镜像
删除一个本地镜像。
```bash
docker rmi <image_id>
```
- `docker`: 调用 Docker 客户端。
- `rmi`: `remove image` 的缩写，删除镜像。
- `<image_id>`: 镜像的唯一 ID 或名称。

## 7. 强制删除镜像
强制删除一个镜像，即使有停止的容器依赖它（慎用）。
```bash
docker rmi -f <image_id>
```
- `docker`: 调用 Docker 客户端。
- `rmi`: 删除镜像。
- `-f`: `force` 的缩写，强制执行。

## 8. 拉取远程镜像
从 Docker Hub 下载别人制作好的镜像。
```bash
docker pull nginx
```
- `docker`: 调用 Docker 客户端。
- `pull`: 下载指令。
- `nginx`: 镜像名称（如果不写版本，默认下载 `latest` 最新版）。

## 9. 查找远程镜像
在 Docker Hub 上搜索别人的镜像。
```bash
docker search mysql
```
- `docker`: 调用 Docker 客户端。
- `search`: 搜索指令。
- `mysql`: 搜索关键词。


## 10. 清理空间
删除所有已停止的容器、未使用的网络和悬空的镜像。
```bash
docker system prune
```


## 11. GPU 支持（深度学习/LLM 专用）
在运行需要显卡的容器（如 PyTorch、TensorFlow）时，必须添加 `--gpus` 参数。
```bash
docker run --gpus all my-llm-app
```
- `--gpus all`: 允许容器使用宿主机的所有显卡。
