---
layout: post
title: "系统完整性检查如何加载虚拟光驱"
description: "系统完整性检查(sfc /scannow )时，无法加载虚拟光驱的问题解决"
category: 技术
tags: [操作系统]
---

这个是你最初的安装系统路径与当前的虚拟光驱盘符路径不同造成的。在开始运行里输入 regedit 打开注册表编辑器定位到

```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Setup
```

把`SourcePath`的内容改成虚拟光驱的盘就行了
