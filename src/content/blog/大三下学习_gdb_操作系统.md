---
title: 'gdb 操作系统'
description: 'study notes'
publishDate: 2026-03-07
category: course
tags: []
---

# 使用
- 一般调试的是 C/C++ 程序
- 在编译时，我们必须要把调试信息加到可执行文件中

- `gdb` 使用
	- 方法1：`gdb program` 例：`gdb ./nachos`
	- 方法2：`gdb <program> core` `[[#^core]]`
	- 方法3：`gdb <program> <PID>` `[[#^getPID]]`
	- `GDB` 启动时，可以加上一些 `GDB` 的启动开关，如 `[[#^-s]]`、`[[#^-c]]`、`[[#^-d]]`
- `break` 设置断点
	- 例： `break 16` 在源程序第 `16` 行处。
	- `break func` 在函数 `func()` 入口处。
	- `b main` 可以用 `b` 代替
- `run` 运行程序，调试前都需要先运行
	- `r` 可简写
	- 可在 run 命令后加参数：`(gdb) run source.txt dest.txt`，模拟 `<program> <参数1> <参数2>`
	- `run` 前可通过 `set args` 设置参数，等价于 `run 参数`
- `next` 单条语句执行，**不**进入程序
	- `n`
- `step` 单步执行，**进入**程序
	- `s` 可简写
- `continue` 继续运行
- `l` 相当于 `list`，从当前第一行开始例出原码。
	- 可用于忘记当前位置时查看
- `info` 
	- `info break` 查看断点信息
- 回车 重复上一次命令
- `print` 打印变量的值
	- `p` 可简写
	- 例：`print i` 打印 i 的内容
- `bt` 查看函数堆栈
	- 可以看到函数传进去的参数
- `finish` 退出函数
	- 主函数 main 不能退出
- 双击 tab 补齐命令的全称，有重复则把其例出来
	- 还可根据函数的前缀找到所有相关函数，例：`b DE` 按一次`tab`找到所有 `DE` 开头的函数
- `shell`
	- 可在 `gdb` 下输入 `shell`、`make` （相当于 `shell make` ）
	- 例 `(gdb)shell ls` 查看当前目录下有哪些文件而不需要退出 `gdb`






- `core`文件 当程序因为非法操作（比如访问了不该访问的内存、除以零等）而非正常退出时，操作系统会把该程序崩溃那一瞬间的内存状态、寄存器信息、堆栈信息等全部“转储”（Dump）到一个文件中，这个文件通常叫 `core` 或 `core.<pid>`，一般系统为关闭生成 ^core
- `ps aux | grep program_name` ^getPID
- `-symbols`，`-s` 从指定文件中读取符号表信息，并把他用在可执行文件中。 ^-s
- `-core`、`-c`，调试时 core dump 的 core 文件。例：`gdb main -c core.1234`，其中core.1234 是崩溃后生成的 core 文件名 ^-c
- -`directory` `-d` 加入一个源文件的搜索路径。默认搜索路径是环境变量中PATH所定义的路径。 ^-d
- 

- **TTY** 泛指 **终端设备（Terminal Device）**。
	*   **平时用的 TTY：**
	    *   在图形界面打开的终端窗口（比如 VS Code 的终端），通常对应 0, 1 等（伪终端）。
	    *   在真实的物理机控制台，对应 tty1 到 tty6。
	*   **`tty <device>` ：**
	    *   **含义：** 告诉 GDB，“**别把程序的输入输出混在现在用的这个终端窗口里，把它扔到另一个终端设备上去运行**”
	    *   **场景：**
	        1.  程序输出太快太乱，干扰了在 GDB 里敲命令。
	        2.  你需要调试一个带图形界面（库如 ncurses）的程序，它会把屏幕弄花，导致你看不到 GDB 的断点信息。
	    *   **做法：**
	        1.  打开一个新的终端窗口，输入命令 `tty` 查看它是谁（比如 2）。
	        2.  回到 GDB 窗口，输入 `tty /dev/pts/2`。
	        3.  输入 `run`。
	    *   **结果：** GDB 的命令还是在你原来的窗口敲，但程序的 output 全都跑到了那个新窗口里 ^1
