---
title: 'python'
description: 'study notes'
publishDate: 2025-11-02
category: other
tags: []
---

# 应用系统相关
## 目标
### 使用虚拟环境
虚拟环境是一个独立的工作空间，用于在同一台计算机上创建和管理多个 Python 项目。每个虚拟环境都有自己的 Python 解释器和库，互不影响。
虚拟环境会占用一定的磁盘空间，因为每个虚拟环境都会复制 Python 解释器和安装的包。不过，相比于不使用虚拟环境而造成的依赖冲突和管理混乱，这种空间消耗是值得的。

1. **创建虚拟环境**：
```bash
python -m venv myenv
这将创建一个名为 `myenv` 的虚拟环境。
```

2. **激活虚拟环境**：
- 在 Windows 上：
```bash
myenv\Scripts\activate
```
- 在 macOS 或 Linux 上：
```bash
source myenv/bin/activate
```

3.  **在虚拟环境中安装库**：
在虚拟环境激活后，您可以使用 `pip` 安装库，所有的库将仅对该虚拟环境可用：
```bash
pip install package_name
```

4. **停用虚拟环境**：
当您完成工作后，可以使用以下命令停用虚拟环境：
```bash
deactivate
```

5. **删除 Python 虚拟环境**:
删除 Python 虚拟环境非常简单。您只需删除该虚拟环境的文件夹即可。

6. vscode 无法使用虚拟环境：
```bash
PS C:\hellopy> & C:/hellopy/.venv/Scripts/Activate.ps1
& : 无法加载文件 C:\hellopy\.venv\Scripts\Activate.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 3
+ & C:/hellopy/.venv/Scripts/Activate.ps1
+   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	+ CategoryInfo          : SecurityError: (:) []，PSSecurityException
	+ FullyQualifiedErrorId : UnauthorizedAccess
```

解决办法：
```bash
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

# 语法相关

`[-1]`:列表最后一项
`[:-1]`:从第一项到最后一项,原型:`[n:m]`,前闭后开
`[::-1]`:从全列表倒序取,原型:`[n:m:k]`,代表的是从那一段开始取，隔几个取一次.m为开不能取
`[n::-1]`:同上
`[:,:,0]`:多维数组处理,前两维全选，取其中的所有0号索引。原型:`[n:m, j:k, g:h]`
`[…,0]`:代表了取最里边一层的所有第`0`号元素，…代表了对`:,:,:,`的省略。
`[…,::-1]`:是对最内层的列表进行逆序取值
