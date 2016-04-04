---
layout: post
title: "centos 7 网卡配置"
description: "network config in centos"
category: 技术
tags: [centos]
---
* 主机名配置文件

```
/etc/hostname
```

* ifconfig

```
yum install net-tools -y
```

* eth0
	* 添加选项 net.ifnames=0 biosdevname=0 到 /etc/default/grub
	* grub2-mkconfig -o /boot/grub2/grub.cfg
	* mv /etc/sysconfig/network-scripts/{ifcfg-eno16777736,ifcfg-eth0}

reboot