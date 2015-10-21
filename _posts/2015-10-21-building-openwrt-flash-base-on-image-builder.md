---
layout: post
title: "Openwrt编译 (基于Openwrt ImageBuilder)"
description: "openwrt, flash, imagebuilder"
category: 技术
tags: [openwrt]
---

## 成功生成openwrt for wndr3700 v4 镜像操作步骤

### 下载合适的image builder 

从网站：<https://downloads.openwrt.org/snapshots/trunk/ar71xx/nand/>
文件名： **OpenWrt-ImageBuilder-ar71xx-nand.Linux-x86_64.tar.bz2**

	wget http://downloads.openwrt.org/snapshots/xxxxx....

<div class="alert alert-warning">
此镜像只能运行于64位系统 之上
</div>

### 解压缩 下载文件

	tar -xvjf OpenWrt-ImageBuilder-ar71xx_xxxxxxx


### 查看当前image builder是否支持你的路由

进入解压缩后的文件夹

```
cd OpenWrt-ImageBuilder-xxxx
make info

Available Profiles:

R6100:
		NETGEAR R6100
		Packages: kmod-usb-core kmod-usb-ohci kmod-usb2 kmod-ledtrig-usbdev
WNDR4300:
		NETGEAR WNDR3700v4/WNDR4300
		Packages: kmod-usb-core kmod-usb-ohci kmod-usb2 kmod-ledtrig-usbdev
NBG6716:
		Zyxel NBG 6716
		Packages: kmod-rtc-pcf8563 kmod-ath10k
```

如上，"R6100","WNDR4300", "NBG6716" 即为 profile,其中有WNDR 3700 V4字样

### 修改分区信息

修改builder/target/linux/ar71xx/image/Makefile文件的分区信息，如 wndr4300, 可参考如下研究：
**加大firmware空间，同时使ubi空间等量加大**

`74752k`(ubi), -> <span style="color: red">0x0000008c0000</span>-`0x0000051c0000` : "ubi"
`76800k`@0x6c0000(firmware), -> <span style="color: green">0x0000006c0000</span>-`0x0000051c0000` : "firmware"
256k(caldata_backup), -> <span style="color: red">0x0000051c0000</span> -`0x000005200000` : "caldata_backup"

### 备份路由器配置

备份文件可在生成镜像时写入成默认值，这样在固件刷成功后，不用再配置

`ssh root@192.168.0.1` 进入路由器openwrt 系统, 当前路由器除登录密码外的所有改动均保存在 /overlay 目录中，故保存`/overlay/etc/config/`下文件到镜像生成宿主系统中。

	scp /overlay/etc/config/* root@182.92.64.247:/home/openwrt/files/etc/config/ 

### 定制需要额外安装的包

	luci luci-app-qos luci-app-upnp luci-proto-ipv6 kmod-usb-core kmod-usb-ohci kmod-usb2 kmod-ledtrig-usbdev jamvm

### 生成镜像

	make image PROFILE=WNDR4300 PACKAGES="luci luci-i18n-base-zh-cn luci-i18n-qos-zh-cn luci-i18n-upnp-zh-cn luci-proto-ipv6 kmod-usb-core kmod-usb-ohci kmod-usb2 kmod-ledtrig-usbdev jamvm" FILES=/home/openwrt/files/

### snapshot 精简版镜像

	make image PROFILE=WNDR4300 PACKAGES="luci luci-i18n-base-zh-cn luci-i18n-qos-zh-cn luci-i18n-upnp-zh-cn classpath jamvm" FILES=/home/openwrt/config/files/
	
### 常用组件
	
**luci组件** `luci luci-app-ddns luci-app-qos luci-app-upnp`
**中文支持** `luci-i18n-base-zh-cn`
**USB挂载* `block-mount`
**硬盘格式支持**  `kmod-fs-ext4`
**UTF8编码** `kmod-nls-utf8`
**USB扩展支持** `kmod-usb-storage-extras`
**自动挂载工具** `badblocks`
**复位键支持** `restorefactory`
**一键开关无线** `wifitoggle`

### 将生成的镜像刷入到路由中

	sftp: get bin/xxxxxxx.img 
