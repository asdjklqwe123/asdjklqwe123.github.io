---
title: 'SSH learn'
description: 'study notes'
publishDate: 2026-03-06
category: other
tags: []
---

[toc]
## 已有进度
在本机的用户目录下有.ssh文件夹，存放了ssh公钥私钥、config
## 问题
### 1. 
目的：在 Git Bash 里输入：`ssh -T git@github.com`  来测试 ssh 是否能连接上 

输入：`ssh -T git@github.com` 

输出：`ssh: connect to host github.com port 22: Connection refused` 

在 .ssh 文件夹中创建`config`
内容为
```Bash
Host github.com
  Hostname ssh.github.com
  Port 443
```
参考：https://blog.csdn.net/hjy_mysql/article/details/131596257

### 2.连接远程服务器
1. 确认网络连通性 `ping 10.102.34.198`
	 - **Ping 通**：说明网络层是通的，问题出在服务器上的 SSH 服务或防火墙。
	 - **Ping 不通**（超时）：可能是网络中断、IP 地址变更，或者需要先连接**学校 VPN**。
2. 测试端口是否开放 
	1. **windows**：`Test-NetConnection 10.102.34.198 -Port 22`
		- 需要在 **PowerShell** 中使用
3. 连接服务器 `ssh 名字@地址`
