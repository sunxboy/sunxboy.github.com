---
layout: post
title: "Build Openwrt环境完整过程"
description: "openwrt"
category: 技术
tags: [openwrt]
---

准备操作系统：Debian 7.5.0 64位

### 新建用户openwrt

	adduser openwrt

(系统将会在/home下创建一名为openwrt的目录，为此用户的home目录)

### 给apt-get添加163源

	vim /etc/apt/sources.list
	
添加以下内容到最末尾

	#testing
	deb http://mirrors.163.com/debian/ testing contrib main non-free
	deb-src http://mirrors.163.com/debian/ testing contrib main non-free


### 安装本地环境依赖包

	apt-get update
	apt-get install git-core build-essential libssl-dev
	apt-get install subversion
	apt-get install ccache
	apt-get install g++-multilib
	apt-get install -y libtool libtool-bin
	apt-get install ecj ecj-gcj libecj-java libecj-java-gcj 

### 安装编译所需要的依赖包：

	apt-get install asciidoc binutils bzip2 fastjar flex g++ gcc gawk libgtk2.0-dev intltool zlib1g-dev make libncurses5-dev libssl-dev patch perl-modules rsync ruby unzip wget gettext xsltproc

**(debian 32bit 6.x）**

	apt-get install libboost1.42-dev libxml-parser-perl libusb bin86 bcc sharutils

**(debian 64bit 7.x)**

	apt-get install  libboost1.49-dev libxml-parser-perl libusb-dev bin86 bcc sharutils
```
apt-get install help2man
```

### 下载所要编译包的源代码 <https://github.com/openwrt/packages>

比如: 找到对应包的路径

	find . -name "alsa-lib"
	
拷贝到sdk/package/对应目录下

	cp -r libs/alsa-lib ~/sdk/package/

