---
title: 'git learn'
description: 'study notes'
publishDate: 2026-03-27
category: other
tags: []
---


## 已有进度

### 1.部分命令：
1. `git branch`:     查看本地分支，前面有“*”号的代表当前分支
2. `git branch -vv`: 查看本地分支和远程分支关联情况
3. `git branch -a`:  查看本地和远程所有分支
4. `git remote`:     查看远程仓库
5. `git remote -v`:     查看远程仓库地址
6. `git merge {分支名}`:合并不同分支
7. `git gc`:         “垃圾回收”(git会自己找机会做)
8. `git pull`:       从远程获取更新并尝试将其合并到你当前的本地分支。(本身是fetch和merge结合)
9. `git branch -m 新名字`:重命名当前本地分支

### 2.提交仓库工作流程
1. 修改文件：你在本地修改了文件。
2. 暂存更改：使用 `git add 文件名` 将更改添加到暂存区。
3. 提交更改：使用 `git commit -m "提交信息"` 将暂存区的更改提交到本地仓库。
4. 推送更改：使用 `git push` 将本地的提交推送到远程仓库。

## 目标

### 1.问题大赏
目的：
问题：出现 (END)
输入：按q
### 2.使用git命令将分支推到远程
#### 1.工作流程
1. 修改文件：你在本地修改了文件。
2. 暂存更改：使用 `git add 文件名` 将更改添加到暂存区。
3. 提交更改：使用 `git commit -m "提交信息"` 将暂存区的更改提交到本地仓库。
4. 推送更改：使用 `git push` 将本地的提交推送到远程仓库。
#### 2.无法切分支
原因：由于本地有未提交的更改，Git 不允许你执行 checkout 操作，以避免覆盖这些更改
+ **提交新分支**
    ```bash
    git add git学习/git_learn.md
    git commit -m "保存更改"
    ```
+ **暂存更改**
    ```bash
    git stash
    ```
如果你想在切换到 `test` 分支后恢复之前的更改，可以运行：
    ```bash
    git stash pop
    ```
+ **丢弃更改**
    ```bash
    git checkout -- git学习/git_learn.md
    ```
#### 3.将远程分支拉到本地分支
如果不在目标分支上，可以使用 `git checkout` 命令切换到该分支：
```Bash
git checkout your-local-branch
```
从远程分支拉取最新的更改到当前本地分支:
```Bash
git pull origin remote-branch
```
#### 4.将本地分支提交到新的分支
希望改完分支后提交到新分支
```Bash
git push origin feature-branch:origin-feature-branch
```
这里的 origin 是远程仓库的名称（通常是默认名称），冒号前面的 feature-branch 是本地分支的名称，冒号后面的 feature-branch 是你希望在远程创建的分支名称。如果远程分支不存在，Git 会自动创建它。
如果希望将本地分支与远程分支建立跟踪关系，以便以后可以使用 `git pull` 和 `git push` 命令而无需指定远程分支，可以使用 -u 选项：
```bash
git push -u origin feature-branch:origin-feature-branch
```
#### 5.更改上游分支（如果需要）
如果希望更改当前本地分支关联的远程分支，可以使用以下命令：
```bash
git branch --set-upstream-to=origin/new-remote-branch my_branch(可省略my_branch)
```
这会将当前本地分支的上游分支更改为 origin/new-remote-branch。前提是这个远程分支存在。否则需要用到
```Bash
git push -u origin feature-branch:origin-new-remote-branch
```
### 3.git文件：.gitignore
.gitignore 文件是一个纯文本文件，包含了项目中所有指定的文件和文件夹的列表，这些文件和文件夹是 Git 应该忽略和不追踪的。
#### 相关语法
详细查看.gitignore
#### 处理已经追踪的文件
如果远程仓库中已经有了部分想忽略的文件的解决办法：
1. 更新 `.gitignore`：确保你已经在 `.gitignore` 文件中添加了希望忽略的文件或文件夹的路径。
2. 解除追踪文件：
    使用命令来解除对这些文件的追踪，但保留本地文件。例如，如果想要去掉 `example.txt`文件或`text`文件夹，可以运行：
    ```bash
    git rm --cached example.txt
    git rm -r --cached text/
    ```
3. 提交更改和推送更改到远程仓库

---

### 把写错的代码回退到之前状态

1. 先看当前状态（避免误操作）
```
git status
git log --oneline -n 5
```

2. 还没 git add（只改了工作区）
- 撤销某个文件改动：
```
git restore 路径/文件名
```
- 撤销全部改动：
```
git restore .
```

3. 已经 git add 了，但还没 commit
- 先取消暂存，再撤销改动：
```
git restore --staged 路径/文件名
git restore 路径/文件名
```
- 全部取消暂存：
```
git restore --staged .
```

4. 已经 commit 了，但还没 push
- 保留代码改动，只撤销提交（最安全）：
```
git reset --soft HEAD~1
```
- 撤销提交并把改动放回未暂存：
```
git reset --mixed HEAD~1
```
- 连代码一起彻底回退（危险）：
```
git reset --hard HEAD~1
```

5. 已经 push 到远程了（协作分支推荐）
- 用反向提交，不改历史：
```
git revert 提交哈希
git push
```

安全建议（强烈推荐）
- 回退前先建一个备份分支：
```
git branch backup-before-rollback
```
- 不确定时优先用 revert 或 soft reset，不要先用 hard reset。

---



### CI
#### YAML
[Learn YAML in Y Minutes](https://learnxinyminutes.com/zh-cn/yaml/)

```yaml
      - name: Upload test results (junit) if any
        if: always()
```

1. YAML 只能用**空格**进行缩进

2. YAML 的两种基本结构  
   - 序列（sequence / list）：用 - 开头表示一个列表元素。  
   - 映射（mapping / dict）：用 key: value 的形式表示键值对。  

2. 这段代码的语法含义  
   - 这行 `- name: Upload test results (junit) if any` 中的 `-` 表示“这是 steps（或其它上级字段）中的一个列表项”。  
   - 同一个列表项可以包含多个键（mapping 条目），后续缩进的行（例如 `if: always()`）就是属于这个列表项的键 — 所以不需要再写 `-`。  
   - 换言之：`-` 开始一个元素，后面缩进的无 `-` 的行是该元素内部的字段（属性）。

#### 顶层映射
```
name: CI
on: push         # 触发器（事件）
jobs:            # jobs 是一个映射，包含若干 job
  test:          # job id = "test"
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    steps:       # steps 是序列（list）
      - uses: actions/checkout@v4   # step 1（以 - 开头）
      - name: Run tests             # step 2（映射内有 name/run/if 等字段）
        run: npm test

```

```yaml
# 序列 (sequences，等价于列表 list 或数组 array ) 看起来像这样：
# 注意 '-' 也算缩进：
a_sequence:
  - Item 1
  - Item 2
  - 0.5 # 序列可以包含不同类型。
  - Item 4
  - key: value
    another_key: another_value
  -
    - This is a sequence
    - inside another sequence
  - - - Nested sequence indicators
      - can be collapsed
# 等价于
{
  "a_sequence": [
    "Item 1",
    "Item 2",
    0.5,
    "Item 4",
    {
      "key": "value",
      "another_key": "another_value"
    },
    [
      "This is a sequence",
      "inside another sequence"
    ],
    [
      [
        "Nested sequence indicators",
        "can be collapsed"
      ]
    ]
  ]
}
```

