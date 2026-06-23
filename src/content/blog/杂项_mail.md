---
title: 'mail'
description: 'study notes'
publishDate: 2026-02-02
category: other
tags: []
---


**任务**
1. 学会发邮箱
	1.1 哪里获取口令
	1.2 邮箱的组成部分
2. 从外部文本中读取信息发邮箱

## 邮箱的组成部分
### 信封
对最终用户不可见
- 发件人地址 MAIL FROM
- 收件人地址 RCTP TO
### 信头
提供元数据
**必须手动提供的数据**
- From 发件人
- To 收件人，To 和 Cc 格式**必须是有效的邮箱地址**（例如 `user@example.com` 或 `"名字" <user@example.com>`），多个地址必须用**逗号** `,` 来分隔
- Cc Carbon Copy 抄送 次要收件人，所有收件人都能看到 Cc 中有谁
- Bcc 密送 最终收件人看到的信头里没有Bcc
- Subject 主题。邮件标题
- Content-Type
	- text/plain 纯文本邮件
	- text/html HTML 格式的邮件 可包含图片链接、样式等
	- multipart/mixed 混合类型 
	- multipart/alternative 多选类型，同时包含纯文本和 HTML ，客户端可根据能力选择显示哪个
	- 代码：`message = MIMEText('这里是正文(信体)', 'plain', 'utf-8')`
**默认提供的数据**
- Data 日期 邮件发送日期和时间
- Message-ID 全局唯一标识符，用于追踪邮件
- Content-Transfer-Encoding 内容传输编码，如 7bit、8bit、base64、quoted-printable

### 信体
这是邮件的核心内容，也就是邮件真正想传达的信息。
信体的**格式**由信头中的 `Content-Type` 字段来定义。
- **纯文本 (Plain Text)**:  
    最简单的格式，只包含文字，没有样式。
- **HTML**:  
    可以包含丰富的格式，如字体、颜色、图片、表格、链接等，就像一个网页。
- **带附件的邮件**:  
    信体会被分成多个部分（`multipart`）。一部分是正文（纯文本或 HTML），其他部分是附件文件。每个附件都有自己的 `Content-Type`（如 `image/jpeg` for a JPG image, `application/pdf` for a PDF file）和内容编码（通常是 `base64`）。

