---
title: 'conda 命令'
description: 'study notes'
publishDate: 2026-05-04
category: other
tags: []
---

### 创建虚拟环境
```bash
conda create -n <env_name>

指定 Python 版本和想预装的包
conda create -n <env_name> python=3.9 numpy pandas 

通过 environment.yml 创建文件
conda env create -f environment.yml

```
示例
```yml
# environment.yml 文件示例
name: my_project_env
dependencies:
  - python=3.9
  - numpy
  - pandas
  # ⭐ 核心：声明 pip 依赖部分
  - pip
  - pip:
    - requests
    - flask
    - -e . # 如果项目本身是一个可安装的包，可以使用 `-e .` 在当前目录安装
```