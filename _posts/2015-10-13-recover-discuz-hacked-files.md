---
layout: post
title: "discuz被黑的处理办法"
description: "discuz被黑的处理办法"
category: 技术
tags: [discuz]
---
一般`网站被黑`都会表现为首页被修改或者打开网站跳转到其他网址。

### 处理的办法
1. 首先做好备份，登陆ftp新建一个zzz目录，保留config，data。这两个目录，把网站的其余内容放到zzz目录。
2. 到官方下载相应版本的源程序，删除官方下载的程序中的config目录，data目录,uc_server/data目录, 模板目录template/ ，插件目录source/plugin/ 这些目录，然后上传到网站的根目录。
3. 从zzz目录找到uc_server/data , 模板目录template/ ，插件目录source/plugin/ 这3个目录，然后放到根目录。
4. 登陆网站检查一下网站的内容，没有问题的话，说明网站已经恢复好了。
后续工作：修改一下网站所有相关的账号密码，能升级到最高版本的程序的话最好升级。