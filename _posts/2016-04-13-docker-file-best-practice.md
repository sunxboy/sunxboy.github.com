---
layout: post
title: "dockerfile 最佳实践 "
description: "docker file 最佳实践"
category: 技术
tags: [docker]
---

### 使用 .dockerignore 文件

为了在 docker build 过程中更快上传和更加高效，应该使用一个 .dockerignore 文件用来排除构建镜像时不需要的文件或目录。例如,除非 .git 在构建过程中需要用到，否则你应该将它添加到.dockerignore 文件中，这样可以节省很多时间。


### 避免安装不必要的软件包

为了降低复杂性、依赖性、文件大小以及构建时间，应该避免安装额外的或不必要的包。例如，不需要在一个数据库镜像中安装一个文本编辑器

### 每个容器都跑一个进程

在大多数情况下，一个容器应该只单独跑一个程序。解耦应用到多个容器使其更容易横向扩展和重用。如果一个服务依赖另外一个服务，可以参考 Linking Containers Together。

### 最小化层

我们知道每执行一个指令，都会有一次镜像的提交，镜像是分层的结构，对于 Dockerfile，应该找到可读性和最小化层之间的平衡。

### 多行参数排序

如果可能，通过字母顺序来排序，这样可以避免安装包的重复并且更容易更新列表，另外可读性也会更强，添加一个空行使用 \ 换行:

```
RUN apt-get update && apt-get install -y \
  bzr \
  cvs \
  git \
  mercurial \
  subversion
```

### 创建缓存

镜像构建过程中会按照 Dockerfile 的顺序依次执行，每执行一次指令 Docker 会寻找是否有存在的镜像缓存可复用，如果没有则创建新的镜像。如果不想使用缓存，则可以在 docker build 时添加 --no-cache=true 选项。

从基础镜像开始就已经在缓存中了，下一个指令会对比所有的子镜像寻找是否执行相同的指令，如果没有则缓存失效。在大多数情况下只对比 Dockerfile 指令和子镜像就足够了。ADD 和 COPY 指令除外，执行 ADD 和 COPY 时存放到镜像的文件也是需要检查的，完成一个文件的校验之后再利用这个校验在缓存中查找，如果检测的文件改变则缓存失效。RUN apt-get -y update 命令只检查命令是否匹配，如果匹配就不会再执行更新了

* CMD: 推荐使用 CMD [“executable”, “param1”, “param2”…] 这种格式，CMD [“param”, “param”]则配合 ENTRYPOINT 使用
* EXPOSE: Dockerfile 指定要公开的端口，使用 docker run 时指定映射到宿主机的端口即可
* NV: 为了使新的软件更容易运行，可以使用 ENV 更新 PATH 变量。如 ENV PATH /usr/local/nginx/bin:$PATH 确保 CMD ["nginx"] 即可运行
