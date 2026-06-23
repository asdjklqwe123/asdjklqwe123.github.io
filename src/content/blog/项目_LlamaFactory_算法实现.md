---
title: 'LlamaFactory 算法实现'
description: 'study notes'
publishDate: 2026-05-21
category: other
tags: []
---


DeMuon 的实现与接入点在这三处：
算法实现本体： src/llamafactory/train/optim/demuon.py
训练时选择 DeMuon 优化器的入口： src/llamafactory/train/trainer_utils.py

使用 DDP 时会在 trainsformers 库里trainer 类下 train_step 时 backword 时自动聚集参数，所以 @override def training_step
```
if self.finetuning_args.use_demuon and self.args.parallel_mode == ParallelMode.DISTRIBUTED:
	sync_ctx = self.accelerator.no_sync(model)
else:
	sync_ctx = nullcontext()
with sync_ctx:
	self.accelerator.backward(loss)

```
        