---
layout: post
title: "Openwrt应用包(package)编译 (基于Openwrt SDK)"
description: "openwrt, package, SDK"
category: 技术
tags: [openwrt]
---

### 下载合适的image builder 

从网站<https://downloads.openwrt.org/snapshots/trunk/ar71xx/nand/>
文件名： **OpenWrt-SDK-ar71xx-nand_gcc-4.8-linaro_uClibc-0.9.33.2.Linux-x86_64.tar.bz2**

	wget http://downloads.openwrt.org/snapshots/xxxxx....

<div class="alert alert-warning">
此镜像只能运行于64位系统 之上
</div>


### 解压缩 下载文件

	tar -xvjf OpenWrt-SDK-ar71xx_xxxxxxx

	
### 分析依赖包

+ 找到要安装的包的源码,并拷贝到package/xxxx目录下，打开Makefile，分析里面DEPENDS ON的依赖包有哪些
+ 分别下载依赖包的源码，并拷贝到package/xxxx目录下，打开Makefile，再看看有哪些后续的依赖，如此循环，一直无直接依赖的包
+ 先编译无依赖树中最低层的包，如

```
make package/alsa-lib/download
make package/alsa-lib/prepare
make package/alsa-lib/compile V=s
make package/alsa-lib/clean

make package/classpath/download
make package/classpath/prepare
make package/classpath/compile V=s
make package/classpath/clean

make package/jamvm/download
make package/jamvm/prepare
make package/jamvm/compile V=s
make package/jamvm/clean

make package/index
```

最后会生成ipk的最终文件
编译完成！！！

### 国际化luci界面

首先借助工具生成.po文件，编辑完成后，找到po2lmo命令，执行：

```
~/snapshot_openwrt/builder/staging_dir/host/bin/po2lmo modbus.po modbus.lmo
```

生成.lmo最终文件即可。




