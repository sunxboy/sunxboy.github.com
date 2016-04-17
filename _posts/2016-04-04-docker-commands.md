---
layout: post
title: "docker命令行"
description: "docker commands"
category: 技术
tags: [docker]
---

### 在官方仓库搜索image

```
docker search [...]
```

### 从官方仓库下载指定image

```
docker pull [image]
```

### 从指定image里生成一个container并在其中运行一个命令

```
docker run [image] [cmd]
```

### 在container里运行交互式命令，比如shell

```
docker run -i -t [imag] [cmd]
```

### 在container里运行后台任务

```
docker run -d [image] [cmd]
```

### 列出最近一个运行过的container，不加-l则只列出正在运行的container（比如后台任务）

```
docker ps -l
```

### 列出所有container

```
docker ps -a
```

### 查看container详情

```
docker inspect [container_id]
```

### 删除某个container，其中container_id不需要输入完整，只要能保证唯一即可

```
docker rm [container_id]
```

### 再次运行某个container

```
docker start [container_id]
```

### 查看某个container的运行日志

```
docker logs [container_id]
```

### 切换到后台任务container，注意：切换到后台任务以后无法用Ctrl-C退出

```
docker attach [container_id]
```

### 中止后台任务container

```
docker stop [container_id]
```

### 将container保存为一个image

```
docker commit [container_id] [image_name]
```

### 列出当前环境中已有images

```
docker images
```

### 将image上传到仓库

```
docker push [image_name]
```

### 列出正在使用的虚拟机

```
"C:\Program Files\Docker Toolbox\docker-machine" ls
```

### 创建一个新的虚拟机

```
docker-machine create --driver virtualbox my-default
```

### 创建新的虚拟机

```
docker-machine create pipbox --driver virtualbox --engine-insecure-registry 192.168.0.131:5000
```

### 查看虚拟机配置参数

```
docker-machine env --shell cmd my-default
```

### Delete all docker containers

```
docker rm $(docker ps -a -q)
```

### Delete all docker images

```
docker rmi $(docker images -q)
```

### 检视 docker container

```
docker inspect container_id
```

### docker 删除images

```
docker rmi xxxxxxxxx(image id)
```

### 通过指定的register mirror生成virtual box 虚拟机

```
$ docker-machine create -d virtualbox  \
> --engine-registry-mirror=http://c309bf7f.m.daocloud.io \
> --virtualbox-hostonly-cidr 192.168.0.20/29 \
> pipbox

eval "$(docker-machine env pipbox)"
```

### 显示容器ip

```
docker-machine ip pipbox
```

### 在容器中运行nginx

```
docker run -d -p 8000:80 nginx
```

### 开始与关闭容器

```
$ docker-machine stop dev
$ docker-machine start dev
```

### 给容器重新生成证书

```
docker-machine regenerate-certs  pipbox
```

### 切换到pipbox容器

```
docker-machine env pipbox
```

### Set Up a Registry Server

```
docker run -d -p 5000:5000 --restart=always --name registry registry:2

docker run -p 5000:5000 registry

docker-machine create --driver virtualbox --engine-insecure-registry myregistry:5000 dev

docker run myregistry:5000/busybox:latest echo 'hello world'
```

### Search Private Registry

```
http://registry.example.com:5000/v1/search?q=rhel
```


### Remove Old Docker Containers

```
docker rm `docker ps --no-trunc -a -q`
```

<http://tashan10.com/yong-dockerda-jian-hadoopwei-fen-bu-shi-ji-qun/>