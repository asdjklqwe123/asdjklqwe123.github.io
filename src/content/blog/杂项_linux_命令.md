---
title: 'linux 命令'
description: 'study notes'
publishDate: 2026-04-27
category: other
tags: []
---

1. `mkdir 文件名`
2. `cd 目标文件夹`
3. `gcc test.cpp -g -o test`:编译test(目前没有`<iostream>`，但有`<stdio.h>`)
4. `ls -l {文件名}`:查看该文件权限
   + `ls`:ls 是一个常用的 Linux/Unix 命令，用于列出目录中的文件和子目录
   + `-rw-r--r-- 1 {所有者} {所属组的用户名} {size} {time} {file}`:没有权限
   + `-rwxr-xr-x 1 {所有者} {所属组的用户名} {size} {time} {file}`:有权限
5. `chmod +x {文件名}`:给该文件增加权限
6. `file {文件名}`: