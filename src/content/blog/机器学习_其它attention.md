---
title: '其它attention'
description: 'study notes'
publishDate: 2026-05-27
category: ml
tags: []
---

 因为 attention 矩阵太大了
 所以用一些方法减少考虑的相关性，加快 attention 的计算
![](/images/Pasted_image_20260527152922.png)

---

Clustering
将 query 和 key 放在一起，将相近的 vector 放在一类
计算 attention 时只有在一个 class 的 query 和 key 才进行运算
![](/images/Pasted_image_20260527153543.png)

---
