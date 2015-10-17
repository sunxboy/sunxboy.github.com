---
layout: post
title: "Vagrant构建虚拟开发环境"
description: "Vagrant构建虚拟开发环境"
category: 技术
tags: [虚拟机]
---
## 安装

需要安装最新版的VirtualBox和Vagrant，并将VirtualBox和Vagrant的目录添加到系统环境变量PATH中。

## 准备镜像

vagrant使用在virtualbox虚拟机基础上封装的box镜像。Vagrant在添加镜像时会自动下载镜像文件，但鉴于国内访问国外网的速度，建议事先使用下载工具单独下载镜像。

Box镜像下载站：[http://www.vagrantbox.es/](http://www.vagrantbox.es/)

我下载Vagrant官方的Ubuntu precise 64 VirtualBox镜像，存放到某个目录下面，比如：
`F:\Virtual Machine\vbox\precise64.box`

## 创建环境, 创建开发目录

作为使用vagrant的主目录，后续将自动生成配置文件Vagrantfile，并将该目录自动映射到虚拟机中的/vagrant目录下。比如，使用如下目录

D:\project\vagrant\dev

## 添加镜像

使用 vagrant box add [box-name] [box-url] 添加box。box名称默认为base。

在上面目录处打开命令行提示符或powershell。添加镜像`F:\Virtual Machine\vbox\precise64.box`到Vagrant，使用如下命令：

	vagrant box add base "file://f:\Virtual Machine\vbox\precise64.box"

其中base为box名称，后面是镜像文件的路径。

提示：

	Downloading box from URL: file://f:\Virtual Machine\vbox\precise64.box
	Extracting box...ate: 247M/s, Estimated time remaining: --:--:--)
	Successfully added box 'base' with provider 'virtualbox'!

表示成功添加名为base的box。

## 初始化

在开发目录中初始化vagrant。

	vagrant init [box-name]

如果box是base，可以省略box-name，否则必须给出box的名字。
执行命令后显示：

	A `Vagrantfile` has been placed in this directory. You are now
	ready to `vagrant up` your first virtual environment! Please read
	the comments in the Vagrantfile as well as documentation on
	`vagrantup.com` for more information on using Vagrant.

表示自动生成配置文件Vagrantfile，可以使用vagrant up启动虚拟机。

## 修改配置文件
添加某些选项，方便后续开发。

比如网络设置采用端口映射：

	config.vm.network :forwarded_port, guest: 80, host: 8080

## 使用

### 基本操作命令

> vagrant init 初始化
vagrant up 启动虚拟机
vagrant halt 关闭虚拟机
vagrant reload 重启虚拟机
vagrant ssh    SSH登陆虚拟机
vagrant status 查看虚拟机运行状态
vagrant destroy 销毁当前虚拟机

### 启动虚拟机

	vagrant up

显示信息：

	Bringing machine 'default' up with 'virtualbox' provider...
	[default] Importing base box 'base'...
	[default] Matching MAC address for NAT networking...
	[default] Setting the name of the VM...
	[default] Clearing any previously set forwarded ports...
	[default] Clearing any previously set network interfaces...
	[default] Preparing network interfaces based on configuration...
	[default] Forwarding ports...
	[default] -- 22 => 2222 (adapter 1)
	[default] -- 80 => 8080 (adapter 1)
	[default] Booting VM...
	[default] Waiting for machine to boot. This may take a few minutes...
	DL is deprecated, please use Fiddle
	[default] Machine booted and ready!
	[default] The guest additions on this VM do not match the installed version of
	VirtualBox! In most cases this is fine, but in rare cases it can
	prevent things such as shared folders from working properly. If you see
	shared folder errors, please make sure the guest additions within the
	virtual machine match the version of VirtualBox you have installed on
	your host and reload your VM.
	 
	Guest Additions Version: 4.2.0
	VirtualBox Version: 4.3
	[default] Mounting shared folders...
	[default] -- /vagrant
	
上面有两个端口映射（22和80）以及一个共享文件夹映射（/vagrant）。

### SSH登陆

使用vagrant ssh登陆虚拟环境。但Windows的命令行提示符cmd没有ssh命令。不过由于我安装git时添加其到环境变量PATH，git内置ssh命令，可以直接在命令行中登陆。

	PS D:\project\vagrant\dev> vagrant ssh
	Welcome to Ubuntu 12.04 LTS (GNU/Linux 3.2.0-23-generic x86_64)
	 
	 * Documentation:  https://help.ubuntu.com/
	Welcome to your Vagrant-built virtual machine.
	Last login: Wed Feb 26 13:57:16 2014 from 10.0.2.2
	vagrant@precise64:~$

可以使用其他ssh客户端，如Putty、Xshell等。
地址为127.0.0.1
端口见上面的映射关系，为2222
用户名为vagrant
Private key为 `C:/Users/用户名/.vagrant.d/insecure_private_key`

## 安装软件

### 添加中文支持
镜像为英文版，需要添加简体中文支持

	sudo apt-get install language-pack-zh-hans
	
修改默认语言为简体中文，编辑/etc/default/locale，将语言改为zh_CN.UTF8。

### 添加各种Python库

首先需要安装python-pip。
安装mysql-dev遇到EnvironmentError: mysql_config not found问题，找不到头文件。需要安装libmysqld-dev，和python-dev。

### 进一步释放C盘空间

vagrant把box默认放在C盘的用户文件夹下，严重占用C盘空间（其实最初的box也就300多兆大小），我需要将其移动到其它位置。
将.vagrant.d文件夹移动到其它位置，并设置他的路径为环境变量VARANT_HOME即可。

**参考**

vagrant官网：[http://www.vagrantup.com/](http://www.vagrantup.com/)

virtualbox官网：[https://www.virtualbox.org/](https://www.virtualbox.org/)