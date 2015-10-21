---
layout: post
title: "openwrt命令总结"
description: "openwrt"
category: 技术
tags: [openwrt]
---

### 需要学会用ssh登录路由器用linux命令查看

	ssh remote_username@remote_host
	
也使用SecureCRT, 配置如下

![ssh配置]({{ site.qiniu_url }}/images/openwrt_command/ssh_config.png)
	
### 基本命令：
```	
ps 命令查看当前系统运行的进程信息
free 命令查看内存使用和swap挂载情况
ls 查看目录和文件
cd 进入退出目录
vi 查看编辑配置文件
```

### 安装命令某个应用

	opkg update
	opkg install xxx

### 使用命令修改配置信息

	uci set network.lan.ipaddr=[lan ip]  

### 使用pppoe设置 
```shell
uci set network.wan.proto=pppoe    //设置wan口类型为pppoe  
uci set network.wan.username=[上网帐户]  
uci set network.wan.password=[上网密码]    //这两行设置pppoe用户名和密码  
```

### 如果要挂在上级路由下面,就需要进行下面的设置 
```shell
uci set network.wan.proto=none    //关掉wan  
uci set network.lan.gateway=[上级路由ip]    //网关指向上级路由  
uci set network.lan.dns=[上级路由ip]    //dns指向上级路由  
uci set dhcp.lan.ignore=1    //关掉lan的dhcp  
```

### 对无线网络进行配置 
```Shell
uci set wireless.@wifi-device[0].disabled=0    //打开无线  
uci set wireless.@wifi-device[0].txpower=17    //设置功率为17dbm 太高会烧无线模块  
uci set wireless.@wifi-device[0].channel=6    //设置无线信道为6  
uci set wireless.@wifi-iface[0].mode=ap    //设置无线模式为ap  
uci set wireless.@wifi-iface[0].ssid=[自己设置SSID]    //设置无线SSID  
uci set wireless.@wifi-iface[0].network=lan    //无线链接到lan上  
uci set wireless.@wifi-iface[0].encryption=psk2    //设置加密为WPA2-PSK  
uci set wireless.@wifi-iface[0].key=[密码]    //设置无线密码  
```

### 提交应用配置 
```Shell
uci commit    //应用  
```

### 手动重启服务

	/etc/init.d/network restart    //重启网络服务  

### 安装luci管理界面 
```Shell
opkg update // 更新软件列表  
opkg list-installed // 查看已安装软件  
opkg install luci // 安装LUCI  
opkg install luci-i18n-chinese // 支持中文  

// 以下根据需要选择安装
luci-app-firewall - 0.10.0-1
luci-i18n-english - 0.10.0-1
luci-lib-core - 0.10.0-1
luci-lib-ipkg - 0.10.0-1
luci-lib-lmo - 0.10.0-1
luci-lib-nixio - 0.10.0-1
luci-lib-sys - 0.10.0-1
luci-lib-web - 0.10.0-1
luci-mod-admin-core - 0.10.0-1
luci-mod-admin-full - 0.10.0-1
luci-proto-core - 0.10.0-1
luci-proto-ppp - 0.10.0-1
luci-sgi-cgi - 0.10.0-1
luci-theme-base - 0.10.0-1
luci-theme-openwrt - 0.10.0-1
```
即可完成LUCI的安装。 

### 开启支持web服务的uhttpd，并设置其为自启动
```Shell
/etc/init.d/uhttpd enable # 开机自启动  
/etc/init.d/uhttpd start # 启动uhttpd  
```

### Wifidog安装
```
  opkg update # Optional
  opkg install wifidog
```

### sftp安装
```
opkg update
opkg install vsftpd openssh-sftp-server
/etc/init.d/vsftpd enable
/etc/init.d/vsftpd start
```

### openwrt snapshot地址

<https://downloads.openwrt.org/snapshots/trunk/ar71xx/nand/>

### openwrt源代码

<https://github.com/openwrt/packages>