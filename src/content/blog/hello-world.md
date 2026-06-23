---
title: 'Hello World - 我的第一篇文章'
description: 'study notes'
publishDate: 2025-03-01
tags:
  - 博客
  - 介绍
author: asdjklqwe123
---

## 欢迎来到我的博客！

这是使用 **Astro** + **Decap CMS** 搭建的个人博客。

### ✨ 特性

- **Markdown 写文章**：所有文章都是 `.md` 文件，写作体验极佳
- **在线编辑**：访问 `/admin/` 可以在浏览器中直接写文章
- **自动部署**：push 到 GitHub 后自动构建发布
- **暗色模式**：自动适配系统主题
- **代码高亮**：使用 Shiki 实现精美的代码块

### 🚀 如何写文章

#### 方式一：在线编辑（推荐）

1. 访问 `https://asdjklqwe123.github.io/admin/`
2. 用 GitHub 账号登录
3. 点击"新建文章"，在编辑器中撰写
4. 点击"发布"，文章会自动提交到 GitHub 并触发部署

#### 方式二：本地编辑

1. 克隆仓库到本地
2. 在 `src/content/blog/` 目录下创建 `.md` 文件
3. 写完后 `git push` 即可

### 📝 Markdown 示例

```python
def hello():
    print("Hello, World!")
```

> 这是一段引用文字。

- 列表项 1
- 列表项 2

| 特性 | 支持 |
|------|------|
| Markdown | ✅ |
| 代码高亮 | ✅ |
| 表格 | ✅ |
| 数学公式 | ❌ |

---

希望这个博客能帮助我记录学习和成长的过程！
