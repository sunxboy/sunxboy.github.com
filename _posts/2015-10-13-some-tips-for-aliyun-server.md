---
layout: post
title: "关于阿里云服务器使用的几个小技巧"
description: "关于阿里云服务器使用的几个小技巧"
category: 技术
tags: [阿里云]
---

## **阿里云的内网怎么传文件**

通过内网ip，那个10.X.X.X的地址，linux的话使用scp命令

### 复制local_file 到远程目录remote_folder下 

```bash
scp local_file remote_user@host:remote_folder 
```

### 复制local_folder 到远程remote_folder（需要加参数 -r 递归） 

```bash
scp –r local_folder remote_user@host:remote_folder 
```

*以上命令反过来写就是远程复制到本地*

### 查找本地是否有可用安装java包

```bash
yum search java | grep -i --color JDK
```

## [云服务器linux使用手册](http://bbs.aliyun.com/read/130069.html?spm=5176.7189909.0.0.GGK1f2)

## [CentOS 6.5安装MongoDB 2.6](http://blog.csdn.net/chszs/article/details/23392487)

## YUM 相关命令

yum是rpm的管理工具，管理一个软件库，可以很好的解决依赖关系   

### yum安装

	yum install -y 软件名

### yum更新
   
	yum update -y  软件名
 
### yum卸载
   
	yum remove -y 软件名
   
或
   
	yum erase -y 软件名


## 使用客户端 SecureCRT 或 XShell 登录服务器

![客户端 登录]({{ site.qiniu_url }}/images/tips_aliyun/client_login.png)

**使用SecureCRT时，修改默认风格和样式**`-> Session Options -> `
  
![样式]({{ site.qiniu_url }}/images/tips_aliyun/secureCRT_style.png)

修改成 Xterm 样式

![Xterm]({{ site.qiniu_url }}/images/tips_aliyun/xterm_style.png)
  
然后修改字体为11

![字体]({{ site.qiniu_url }}/images/tips_aliyun/sesstion_font.png)

进入系统后，运行 `df -h`**查看磁盘空间**
  
## 安装java环境
```
yum list java*
yum list java-1.7*
java-1.7.0-openjdk* -y
```

## 安装mongodb
```
cd /home
yum list mongodb*
yum install mongodb-server* -y
```

### 配置mongodb
**验证MongoDB**

	chkconfig mongod on

**启动mongodb**

	service mongod restart

## 安装tomcat

	yum list tomcat*
	yum install tomcat tomcat-webapps tomcat-admin-webapps

*(在debian linux 中，命令是 `apt-get install tomcat7 tomcat7-admin`)*

### 配置tomcat

**修改/usr/share/tomcat6/conf/server.xml**


	<Connector port="8000" protocol="HTTP/1.1"
	connectionTimeout="20000"
	redirectPort="8443" />


**修改/usr/share/tomcat6/conf/tomcat-users.xml**

*(在debian linux 中此文件在/var/lib/tomcat7/conf/...目录下)*

在`<tomcat-users>  </tomcat-users>`中添加

	<role rolename="manager"/>
	<role rolename="manager-gui"/>
	<role rolename="admin"/>
	<role rolename="admin-gui"/>
	<user username="admin" password="sunxboy" roles="admin-gui,admin,manager-gui,manager"/>

web管理控制台 `http://ipaddress:port/manager/html`
部署应用 `http://ipaddress:port/host-manager/html`

**开机自动启动**

	chkconfig tomcat6 on

**启动tomcat**

	service tomcat6 start
