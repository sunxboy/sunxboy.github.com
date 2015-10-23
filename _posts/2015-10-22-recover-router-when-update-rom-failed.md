---
layout: post
title: "刷机失败后的恢复方法"
description: "openwrt rom failed recover"
category: 技术
tags: [openwrt, 刷机]
---

## 刷机失败后的恢复方法

如果你不幸将路由器刷成砖了，别害怕，你还可以使用 TFTP 协议来刷入一个新的固件。

### 准备

+ 一个TFTP客户端软件，命令行或者图形界面的均可。
+ 电脑IP必须设置为 192.168.1.x ,因为路由器默认的恢复模式IP被设置为 192.168.1.1.
+ 一个新的需要刷入的固件，网件原生固件或者OpenWrt的 "factory.img" 固件均可，但不能是 "Sysupgrade" 版本。
+ 能够按下路由器Reset按钮的工具。

### 刷机步骤

+ 设置好PC端，用网线连接路由器和PC
+ 打开路由器电源
+ 当交换机的LED灯亮起时，迅速按下RESET按钮
+ 保持按住RESET，直到电源LED开始闪烁黄色到绿色
+ 当电源LED闪烁绿色时，松开RESET
+ 使用TFTP客户端传送固件到路由器的IP 192.168.1.1.
+ 等几分钟，路由器将完成刷机，并自动重启

<div class="alert alert-warning">
TFTP 传送固件很快（因为文件被存储到RAM中）。但是，路由器刷新固件将需要几分钟时间，之后会自动重启。一定保持耐心 – 参考: https://forum.openwrt.org/viewtopic.php?pid=103295#p103295
</div>

### tftp命令行刷固件

当下载运行`tftp2.exe`后，可以通过以下方法刷固件，后自动重启

	tftp -i 192.168.1.1 PUT <filename>

在刷系统之前，最好将 /overlay 目录打包压缩，用于后续恢复配置，按照openwrt的设计，只有修改过的文件才会放到 /overlay 目录，具体原理参考union文件系统

若需要向路由器传输文件，可运行如下：

	scp -p ~/xxxxxFile root@192.168.0.1:/tmp

