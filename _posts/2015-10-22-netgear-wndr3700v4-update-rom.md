---
layout: post
title: "netgear wndr3700v4 刷新固件步骤"
description: "wndr3700v4 rom openwrt"
category: 技术
tags: [openwrt, 刷机]
---

### 先下载 适合你路由器版本的openwrt稳定版编译固件

WNDR3700V4 openwrt固件地址： **ubi-factory.img**
<http://downloads.openwrt.org.cn/OpenWrt-DreamBox/barrier_breaker/14.07/ar71xx/openwrt-ar71xx-nand-wndr3700v4-ubi-factory.img>

WNDR3700V4 openwrt固升级包：**sysupgrade.tar**
<http://downloads.openwrt.org.cn/OpenWrt-DreamBox/barrier_breaker/14.07/ar71xx/openwrt-ar71xx-nand-wndr3700v4-squashfs-sysupgrade.tar>

### 网线连接路由器

打开 192.168.1.1,选择升级，上传img 固件完成重启，再次打开192.168.1.1，
系统 -> 备份/升级 -> 动作 -> 刷写新的固件
`（不要选择保留配置）`

选择tar固件，点击`刷写固件`，完成重启。

此时openwrt安装完成

### 登录

打开192.168.1.1, 修改登录密码，勾选`允许远程主机连接本地SSH转发端口`，完成。

### 本地电脑打开控制台

	ssh root@192.168.1.1

输入密码 xxxxx
