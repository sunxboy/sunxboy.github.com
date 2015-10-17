---
layout: post
title: "sftp 命令"
description: "sftp"
category: 技术
tags: [sftp]
---

### 基本命令

首先可以查询该FTP给我们提供了那些基本命令，就输入:help命令，就帮我们显示该FTP提供所有的命令 

+ pwd:  查询linux主机所在目录(也就是远程主机目录) 
+ lpwd: 查询本地目录（一般指windows上传文件的目录） 
+ ls:   查询连接到当前linux主机所在目录有哪些文件 
+ lls:  查询当前本地上传目录有哪些文件 
+ lcd:  改变本地上传目录的路径 
+ cd:   改变远程上传目录 
+ get:  将远程目录中文件下载到本地目录 
+ put:  将本地目录中文件上传到远程主机(linux) 
+ quit: 断开FTP连接    
