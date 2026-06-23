---
title: 'linux 服务器tmux'
description: 'study notes'
publishDate: 2026-04-27
category: other
tags: []
---


**tmux**
在远程服务器中创建好一个 tmux 会话后，在其中运行程序，断开服务器连接程序也不会中断

1. 创建新的 `tmux`
	- tmux new -s 名字
2. 安全退出（分离）当前的 `tmux` 会话：
	- . `Ctrl+b` 然后按 `d`
3. 重新进入（附加会话）：
	- `tmux attach -t 名字`
4. 查看当前会话
	- `tmux ls`
5. 删除会话
	-  `tmux kill-session -t 名字