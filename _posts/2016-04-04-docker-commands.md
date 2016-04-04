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