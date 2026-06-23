---
title: '算法学习导航'
description: 'study notes'
publishDate: 2025-03-02
category: algorithm
tags:
  - 导航
  - 算法
---

## 算法学习专栏

记录我的算法与数据结构学习过程。

### 内容规划

- **LeetCode 刷题记录**：按题型分类整理
- **算法竞赛题解**：ACM / OI 相关
- **数据结构详解**：树、图、堆、并查集等
- **面试算法总结**：高频题型与技巧

```cpp
// 二分查找模板
int binary_search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

> 脚踏实地，每天进步一点点。
