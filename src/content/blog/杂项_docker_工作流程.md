---
title: 'docker 工作流程'
description: 'study notes'
publishDate: 2026-04-27
category: other
tags: []
---

Docker 工作流程主要围绕镜像、容器和仓库三个核心概念，典型流程如下：

0. **windows 下打开 Docker desktop** （其它系统不知道）

1. **编写 Dockerfile**  
	- 定义应用环境、依赖及启动命令。

2. **构建镜像**  
	- 执行 `docker build`，依据 Dockerfile 逐层创建只读镜像。
	- 详细可看 命令 文件

3. **运行容器**  
	- 执行 `docker run`，从镜像启动可写容器层，运行应用进程。
	- 容器不是“进程”，而是“进程运行的环境”

4. **管理容器生命周期**  
	- 使用 `docker start/stop/restart/rm` 控制容器的运行、停止与删除。

5. **推送/拉取镜像**  
	- 通过 `docker push/pull` 与镜像仓库（如 Docker Hub）交互，实现镜像的共享与分发。

**流程示意图**：  
`编写 Dockerfile` → `docker build` → **镜像** → `docker run` → **容器**（运行中） → `docker stop/rm`  
↕️ `docker push/pull` **镜像仓库**

简单总结：**从文件构建镜像，从镜像启动容器，容器运行应用，仓库共享镜像**。