---
layout: post
title: "media wiki 的搭建"
description: "media wiki 的搭建"
category: 技术
tags: [mediawiki]
---

### 安装 docker 和docker compose

### 创建　docker-compose.yml

```
wiki2:
    image: 'nickstenning/mediawiki'
    ports:
        - "8880:80"
    links:
        - db:database
    volumes:
        - /data/wiki2:/data

db:
    image: "mysql"
    expose:
        - "3306"
    environment:
        - MYSQL_ROOT_PASSWORD=defaultpass
```

### 运行

```
docker-compose up -d
```

### 打开　http://zsunsoft.com:8880/ ，配置media wiki

```
数据库名: mediawiki
数据库用户名:root
数据库密码:defaultpass
数据库表前缀无
```

### 下载LocalSettings.php

```
拷贝 LocalSettings.php到wiki根目录
scp LocalSettings.php root@zsunsoft.com:/data/wiki2/
```