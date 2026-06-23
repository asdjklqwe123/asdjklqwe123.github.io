---
title: 'trainsformer'
description: 'study notes'
publishDate: 2026-05-27
category: ml
tags: []
---

## Seq2seq 问题 - Transformer 解决
例：语音识别 、翻译 、 语音辨识
QA : Question Answering
各式各样的 NLP 任务都可用 Seq2seq model ,当然一般特制化更好

Seq2seq 包含两部分
![](/images/Pasted_image_20260419104922.png)
**Encoder**
![](/images/Pasted_image_20260419105028.png)
其中，每个 block 做的事情有点像 resnet，下面是 block 实现
![](/images/Pasted_image_20260419105200.png)
问题：按这个逻辑 decoder 后的 vector 和输入的 input vector 的数量是一样的？因为当你 self attention 后你需要将 input factor 加上 self attention 后的vector 
答：是的，但学习的参数和self-attention中一样，只和 input vector 维数相关，和长度无关，所以无所谓

---

**Decoder**
分为 AT 和 NAT
**AT** 
autoregressive 自回归，它的输入是它之前的输出，所以得用 Masked Self-attention

![](/images/Pasted_image_20260424135651.png)

**NAT**
none-autoregressive


---

Beam Search
原本用贪心策略选择：选出了红路
![](/images/Pasted_image_20260527083519.png)
 所以有 Beam Search 用某种估计算法找路

答案相对唯一时一般效果好
否则一般更差

---
训练时
由于输入使用的是 ground truth
测试时
自己的输出作为后面输入
产生 exposure

所以使用
Scheduled Sampling 
训练时使用一些错误输入

