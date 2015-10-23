---
layout: post
title: "如何管理和配置opkg包"
description: "opkg package manager, openwrt"
category: 技术
tags: [openwrt, opkg]
---

### 在路由器中列出已安装的包

	root@OpenWrt:~# echo $(opkg list-installed | awk '{print $1}')

<p class="bg-primary">
base-files busybox dnsmasq dropbear firewall fstools hostapd-common ip6tables iptables iw iwinfo jshn jsonfilter kernel kmod-ath kmod-ath9k kmod-ath9k-common kmod-cfg80211 kmod-crypto-aes kmod-crypto-arc4 kmod-crypto-core kmod-gpio-button-hotplug kmod-ip6tables kmod-ipt-conntrack kmod-ipt-core kmod-ipt-nat kmod-ipt-nathelper kmod-ipv6 kmod-ledtrig-usbdev kmod-lib-crc-ccitt kmod-mac80211 kmod-nls-base kmod-ppp kmod-pppoe kmod-pppox kmod-slhc kmod-usb-core kmod-usb-ohci kmod-usb2 libblobmsg-json libc libgcc libip4tc libip6tc libiwinfo libiwinfo-lua libjson-c libjson-script liblua libnl-tiny libubox libubus libubus-lua libuci libuci-lua libxtables lua luci luci-app-firewall luci-base luci-lib-nixio luci-mod-admin-full luci-proto-ipv6 luci-proto-ppp luci-theme-bootstrap mtd netifd odhcp6c odhcpd opkg ppp ppp-mod-pppoe procd procd-nand swconfig ubi-utils uboot-envtools ubox ubus ubusd uci uhttpd uhttpd-mod-ubus wpad-mini
</p>

### opkg安装包库的配置

在文件`/etc/opkg.conf` 中，有类似以下行文

	src/gz snapshots http://downloads.openwrt.org/snapshots/trunk/ar71xx/packages
	dest root /
	dest ram /tmp
	lists_dir ext /var/opkg-lists
	option overlay_root /overlay

可将其配置为选取本地库

	src/gz local file:////path/to/packagesDirectory

或使用多个库路径

	...
	src/gz base file:///pathtopackagesdirectory///packages/base
	src/gz luci file:///pathtopackagesdirectory///packages/luci
	src/gz packages file:///pathtopackagesdirectory///packages/packages
	src/gz oldpackages file:///pathtopackagesdirectory///packages/oldpackages
	... etc ...

即可。	

