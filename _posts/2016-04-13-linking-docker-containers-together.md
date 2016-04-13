---
layout: post
title: "Docker 链接容器"
description: "Docker 链接容器"
category: 技术
tags: [docker]
---

链接允许容器间安全通信，使用 --link 选项创建链接。

```
$ sudo docker run -d --name db training/postgres
```

基于 training/postgres 镜像创建一个名为 db 的容器，然后下面创建一个叫做 web 的容器，并且将它与 db 相互连接在一起

```
$ sudo docker run -d -P --name web --link db:db training/webapp python app.py
```

--link <name or id>:alias 选项指定链接到的容器。

查看 web 容器的链接关系:

```
$ sudo docker inspect -f "{{ .HostConfig.Links }}" web
[/db:/web/db]
```

可以看到 web 容器被链接到 db 容器为 /web/db，这允许 web 容器访问 db 容器的信息。


<div class="alert alert-warning">
		容器之间的链接实际做了什么？一个链接允许一个源容器提供信息访问给一个接收容器。在本例中，web 容器作为一个接收者，允许访问源容器 db 的相关服务信息。Docker 创建了一个安全隧道而不需要对外公开任何端口给外部容器，因此不需要在创建容器的时候添加 -p 或 -P 指定对外公开的端口，这也是链接容器的最大好处，本例为 PostgreSQL 数据库。
</div>
