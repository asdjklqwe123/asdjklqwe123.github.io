# asdjklqwe123.github.io

我的个人技术博客，基于 [Astro](https://astro.build) 构建，使用 Decap CMS 在线编辑，托管在 GitHub Pages 上。

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（http://localhost:4321）
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## ✍️ 写文章

### 方式一：在线编辑

1. 访问 **https://asdjklqwe123.github.io/admin/**
2. 用 GitHub 账号登录授权
3. 在后台直接撰写和发布文章
4. 文章会自动提交到 GitHub，触发自动部署（约 1-2 分钟生效）

### 方式二：本地 Markdown 编辑

1. 在 `src/content/blog/` 目录下创建 `.md` 文件
2. 添加 frontmatter 元数据：

```yaml
---
title: '文章标题'
description: '文章描述'
publishDate: 2025-06-01
tags:
  - 标签1
  - 标签2
draft: false
---
```

3. `git push` 到 main 分支，自动部署

## ⚙️ Decap CMS 配置

访问 **https://asdjklqwe123.github.io/admin/** 即可使用在线编辑器。

### GitHub OAuth 设置

Decap CMS 需要 GitHub OAuth 授权才能提交文章。请按以下步骤操作：

1. 前往 [GitHub OAuth Apps](https://github.com/settings/developers) 创建新的 OAuth App
   - Homepage URL: `https://asdjklqwe123.github.io`
   - Authorization callback URL: `https://api.netlify.com/auth/done`（使用 Netlify 的免费认证服务）

2. 或者自建认证服务（推荐使用 Netlify 免费方案）：
   - 在 [Netlify](https://app.netlify.com) 创建一个站点
   - 启用 [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
   - 在 Identity 设置中注册 GitHub 外部提供商
   - 将 `public/admin/config.yml` 中的 backend 改为 Netlify Auth

3. 最简单的方式：直接使用 **GitHub 网页端编辑**，在仓库中直接编辑 `src/content/blog/` 下的 .md 文件，GitHub 会自动提交。

## 📁 项目结构

```
asdjklqwe123.github.io/
├── .github/workflows/deploy.yml   # GitHub Actions 自动部署
├── public/
│   ├── admin/                      # Decap CMS 在线编辑器
│   │   ├── index.html
│   │   └── config.yml
│   └── favicon.svg
├── src/
│   ├── content/
│   │   └── blog/                   # 📝 文章存放在这里
│   ├── content.config.ts           # 内容集合配置
│   ├── layouts/
│   │   └── BaseLayout.astro        # 基础页面布局
│   └── pages/
│       ├── index.astro             # 首页
│       ├── about.astro             # 关于页
│       └── blog/
│           ├── index.astro         # 博客列表
│           └── [...slug].astro     # 文章详情页
├── astro.config.ts
├── package.json
└── tsconfig.json
```

## 🔧 技术栈

- **框架**: [Astro](https://astro.build) v5
- **内容管理**: [Decap CMS](https://decapcms.org/) v3
- **托管**: [GitHub Pages](https://pages.github.com)
- **自动化**: GitHub Actions
- **语言**: TypeScript

## 功能特性

1.  **静态博客系统**：
    *   支持 Markdown 格式写作。
    *   **自动识别**：只需将 `.md` 文件上传至 `pages/blog/posts/` 目录，博客主页会自动列出新文章，无需手动修改 HTML。
    *   **自动渲染**：点击文章标题，系统会自动将 Markdown 转换为网页显示。

2.  **排行榜**：首页包含一个动态排行榜功能。

3.  **井字棋游戏 (Tic-Tac-Toe)**：
    *   一个简单的网页版井字棋游戏。
    *   **云端记录**：利用 Vercel Serverless 和 Upstash Redis 数据库，自动记录每一局的胜负结果。
    *   **历史回放**：游戏页面下方实时显示最近的对局历史。

## 已知问题

*   **API 速率限制**：博客列表功能依赖 GitHub API。未登录状态下，GitHub 限制每小时每 IP 只能请求 60 次。如果频繁刷新博客主页导致加载失败，请等待一段时间后再试。
*   **跨域问题**：如果在本地直接打开 HTML 文件（非 localhost），井字棋的历史记录功能可能会因为跨域限制无法连接 Vercel API。建议通过 GitHub Pages 访问。

