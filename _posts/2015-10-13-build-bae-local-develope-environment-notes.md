---
layout: post
title: "BAE 本地开发环境调试笔记"
description: "BAE 本地开发环境调试笔记"
category: 技术
tags: [bae]
---

### 查看当前已经申请的服务

	bae service status

### 发布代码都本地环境

	bae app publish --local

### 宿主机中使用浏览器访问

php或python可修改系统hosts文件，将127.0.0.1配为指定的应用域名

	app_domain:10080

java应用同样指定对应的war包名(root.war直接通过/访问)

	127.0.0.1:10080/$war_name/

### 开发者可执行对本地环境后端server的控制
 
	bae instance restart --local 
	bae instance start --local 
	bae instance stop --local

	bae app update

### 查看BAE当前支持的服务

	bae service list

### 虚拟机中使用curl命令访问

php或python应用可指定应用域名，同时处理多个应用，域名可以通过bae app list获取

	curl 127.0.0.1:8080 -H "Host: $app_domain"

java应用直接指定对应的war包名(root.war直接通过/访问) 

	curl 127.0.0.1:8080/$war_name/

### 宿主机中使用浏览器访问

php或python可修改系统hosts文件，将127.0.0.1配为指定的应用域名

	app_domain:10080

java应用同样指定对应的war包名(root.war直接通过/访问)

	127.0.0.1:10080/$war_name/

### xshell 登录虚拟机

	ssh root@127.0.0.1 10022 (password:vagrant)

### 本地运行BAE应用

	bae login

### 获取BAE应用
其中ID中在管理控制台应的"基本信息"中获取

	bae app setup -I <ID>


### 看LOG

	bae log tail
 
[参考](http://developer.baidu.com/wiki/index.php?title=docs/cplat/bae/localdev)