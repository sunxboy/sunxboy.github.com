---
layout: post
title: "我的交叉编译经验谈"
description: "openwrt, 交叉编译, 经验"
category: 技术
tags: [openwrt, 交叉编译]
---

### 从SDK编译ipk包

当执行类似于

	make package/classpath/compile

时，如果报错了，报错信息都可以在`logs/pakcage/classpath/compile.txt`中找到
重点查看 **Checking 'XXXXXXXX'... no **信息。
因为根据我的经验，大部分错误都是因为`包缺失`导致的。

### 交叉编译openJDK

参考<http://www.webos-internals.org/wiki/Building_JamVM_and_GNU_Classpath_and_Jikes_(for_Java_support_in_webOS)_with_scratchbox2#OpenJDK>

### 交叉编译时，宿主系统安装jdk时出现unlocate错误的问题解决

+ 运行以下命令，以查看本系统支持的jdk版本是否一致？

```
apt-cache --names-only search openjdk
```

+ 安装相应版本的某些部分

```
jdk jre jre-dev ...
```

### 关于openwrt中搭建java环境的探索

<https://forum.openwrt.org/viewtopic.php?id=54849>