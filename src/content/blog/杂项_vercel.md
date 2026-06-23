---
title: 'vercel'
description: 'study notes'
publishDate: 2025-11-29
category: other
tags: []
---

## 提供的数据集
1. **Edge Config**:
    - _用途_：存配置文件的（比如网站开关、黑白名单）。
    - _特点_：读得极快，但写得很慢且有限制。
2. **Blob**:
    - _用途_：存大文件的（图片、视频、PDF）。
3. **Neon / Supabase / Prisma Postgres / Nile**:
    - _类型_：**Postgres (SQL 关系型数据库)**。
    - _用途_：存复杂的结构化数据（比如用户表、订单表、关联关系）。
    - _特点_：功能强大，但需要学 SQL 语言，配置相对繁琐。
4. **MongoDB Atlas**:
    - _类型_：**文档型数据库**。
    - _用途_：存 JSON 文档。
5.  **Upstash (Redis)**
	- Redis 是一种“键值对”数据库（Key-Value），就像一个巨大的 JSON 对象。存数据就像写 `Map.set(key, value)` 一样简单，不需要学复杂的 SQL 语句。
	- **完全免费额度**：Upstash 提供非常慷慨的免费层（每天 10,000 次请求），对于个人博客绰绰有余。
	- **Vercel 官方集成**：Vercel 之前的内置 KV 其实底层就是 Upstash。现在虽然改成了 Marketplace 形式，但集成依然最丝滑。