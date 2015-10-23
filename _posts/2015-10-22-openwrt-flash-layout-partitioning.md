---
layout: post
title: "Openwrt Flash Layout 分区调整"
description: "openwrt, flash layout"
category: 技术
tags: [openwrt, 分区]
---

### 关于分区的基本知识

<http://www.leiphone.com/news/201406/diy-a-smart-router-topic-openwrt.html>

### 几个常用的分区信息查看命令
```
cat /proc/mtd
--------------------
dev:    size   erasesize  name
mtd0: 00040000 00020000 "u-boot"
mtd1: 00040000 00020000 "u-boot-env"
mtd2: 00040000 00020000 "caldata"
mtd3: 00080000 00020000 "pot"
mtd4: 00200000 00020000 "language"
mtd5: 00080000 00020000 "config"
mtd6: 00300000 00020000 "traffic_meter"
mtd7: 00200000 00020000 "kernel"
mtd8: 01700000 00020000 "ubi"
mtd9: 01900000 00020000 "firmware"
mtd10: 00040000 00020000 "caldata_backup"
mtd11: 06000000 00020000 "reserved"
```

```
cat /proc/partitions
--------------------
major minor  #blocks  name

  31        0        256 mtdblock0
  31        1        256 mtdblock1
  31        2        256 mtdblock2
  31        3        512 mtdblock3
  31        4       2048 mtdblock4
  31        5        512 mtdblock5
  31        6       3072 mtdblock6
  31        7       2048 mtdblock7
  31        8      23552 mtdblock8
  31        9      25600 mtdblock9
  31       10        256 mtdblock10
  31       11      98304 mtdblock11
 254        0      12028 ubiblock0_0
```

### 修改分区参数

在编译内核时，找到文件`./target/linux/ar71xx/image/Makefile`


### wndr3700v4下默认分区的一些事实

![flash layout]({{ site.qiniu_url }}/images/openwrt/flash_layout.png)


### 几种增加空间的方案

+ 添加新的分区modbus(50MB)
`51200k@0x2000000(modbus),`
**不可行**：不能识别modbus在哪里（需要挂载？）

+ 加大firmware空间，同时使ubi空间等量加大

![flash layout adjust]({{ site.qiniu_url }}/images/openwrt/flash_layout_adjust.png)
