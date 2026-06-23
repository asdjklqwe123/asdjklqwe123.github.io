---
title: 'self-attention'
description: 'study notes'
publishDate: 2026-04-24
category: ml
tags: []
---


FC 全连接层

---
### self-attention
词汇表示成向量
1. One-hot Encoding 假设所有词汇间无关系
2. Word Embedding 

输入为向量
输出
1. 每个向量有一个label 例：词性分析 
2. 整个seq有一个label 
3. 机器自己决定有多少个label ，即 seq2seq任务

**对于第一种问题**
即 Sequence Labeling 问题

self-attention 工作原理
![](/images/Pasted_image_20260413150344.png)
![](/images/Pasted_image_20260413150527.png)
对于得到 b1 
![](/images/Pasted_image_20260413150939.png)
**Dot-product**
**Additive**
![](/images/Pasted_image_20260413150959.png)
**Dot-product**
其中 $阿尔法$ 为相关性，即 attention score
![](/images/Pasted_image_20260413150914.png)
![](/images/Pasted_image_20260413151248.png)
这里不一定要用soft-max
![](/images/Pasted_image_20260413151405.png)
**上述过程的矩阵表示**
![](/images/Pasted_image_20260413151959.png)
![](/images/Pasted_image_20260413152159.png)
![](/images/Pasted_image_20260413152334.png)
**要学习的参数**
![](/images/Pasted_image_20260413152455.png)

**以上没有考虑位置信息**
对于任意位置的操作都一样，然后最后加起来
所以每个位置加上一个向量 e 
![](/images/Pasted_image_20260413153546.png)


**问题**
你 input vector 的数量应该是不固定的吧， 但是self attention中它不是按照你输入的 vector 的数量来进行运算的？
答： $W^k$ $W^q$ $W^v$ 矩阵只和每个输入 vector 的维数有关，所以需要学习的参数大小是固定的，运算时产生的注意力矩阵 A 和 input vector 长度有关 

**总结**
最后求出的 A‘ 大小为 sequence 的长度的平方


---



 


