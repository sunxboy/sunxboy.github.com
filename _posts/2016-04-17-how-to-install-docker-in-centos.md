---
layout: post
title: "如何的在centos中安装docker"
description: "如何的在centos中安装docker"
category: 技术
tags: [centos,docker]
---

### CentOS6

对于 CentOS6，可以使用 EPEL 库安装 Docker，命令如下:

```
$ sudo yum install http://mirrors.yun-idc.com/epel/6/i386/epel-release-6-8.noarch.rpm
$ sudo yum install docker-io
```

### CentOS7

CentOS7 系统 CentOS-Extras 库中已带 Docker，可以直接安装:

```
$ sudo yum install docker
```

安装之后启动 Docker 服务，并让它随系统启动自动加载。

```
$ sudo service docker start
$ sudo chkconfig docker on
```

### centos7中安装docker 1.1.2

```
curl -fsSL https://get.docker.com/ | sh

rpm --import "https://sks-keyservers.net/pks/lookup?op=get&search=0xee6d536cf7dc86e2d7d56f59a178ac6c6238f52e"
yum install -y yum-utils

yum-config-manager --add-repo https://packages.docker.com/1.10/yum/repo/main/centos/7
```