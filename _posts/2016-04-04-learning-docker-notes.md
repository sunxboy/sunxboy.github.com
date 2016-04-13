---
layout: post
title: "docker 学习笔记"
description: "docker notes when learning"
category: 技术
tags: [docker]
---

## update docker machine hosts scripts
```
#!/usr/bin/env bash
#Usage docker-machine-update-hosts.sh hosts.conf default
#arg1 is a configuration file with hosts
#arg2 is the docker-machine name e.g. default

DOCKER_IP=$(docker-machine ip $2)
echo "$2 ip: $DOCKER_IP"

#Remove existing lines from hosts
while IFS='' read -r line || [[ -n "$line" ]]; do
  echo "Removing existing domain $line"
  sudo sed -i '' '/'$line'/d' /etc/hosts
done < "$1"

#Add new hosts to the bottom of the file
while IFS='' read -r line || [[ -n "$line" ]]; do
  echo "Adding entry $DOCKER_IP $line"
  sudo echo "$DOCKER_IP $line" >>/etc/hosts
done < "$1"
```

## Docker ADD rpm file in Dockfile
Put this line before your rpm -i command:

```
ADD /host/abs/path/to/chrpath-0.13-14.el7.x86_64.rpm /chrpath-0.13-14.el7.x86_64.rpm
```

Then you'll be able to do

```
RUN rpm -i chrpath-0.13-14.el7.x86_64.rpm
```

## 登录docker主机

```
docker-machine env default
```

## 切换到root用户

```
sudo -i
```

### 报错：Cannot connect to the Docker daemon的问题解决

```
sudo usermod -aG docker  hadoop(username)
```

### 开机自动启动docker

```
systemctl enable docker
```

### 运行Docker仓库
运行仓库并命名为docker-registry,让镜像存储在宿主机上的`/opt/docker/registry/data/`下

```
sudo docker run -d -p 5000:5000 -v /opt/docker/registry/data:/tmp/registry-dev --name docker-registry registry:2.0.1
```

<div class="alert alert-warning">
		这里注意避免5000端口被占用而引起冲突,可以通过sudo docker ps 查看该容器是否已启动。接下来可以通过docker tag ,docker push进行简单测试，具体用法可以查询docker help tag和docker help push.
</div>

### 生成签名证书

```
sudo openssl req -x509 -nodes -newkey rsa:2048 -keyout /opt/docker/registry/conf/docker-registry.key  -out /opt/docker/registry/conf/docker-registry.crt
```

<div class="alert alert-warning">
		这里一定要注意：创建证书的时候，可以接收所有默认，直到CN位置时，如果你是准备让外网访问，就需要外网的域名；如果是内网，可以输入运行私有仓库宿主机的别名。我们可以通过`ifconfig`查看ip,假定为10.10.62.103,通过sudo vi /etc/hosts添加一行到该文件并保存退出，例如:10.10.62.103 devregistry。这条命令主要是在/opt/docker/registry/conf/下创建证书docker-registry.key和docker-registry.crt,其中docker-registry.crt放在随后与docker-registry进行交互的装有Docker客户端宿主机上。需要了解的是，这个宿主机可以是运行docker-registry的server，也可以是能访问该域名或别名的装有docker的其他server。
</div>

### 创建能够访问仓库的用户名和密码

为了让允许的用户登录访问，需要利用htpasswd创建用户和密码，并存储于/opt/docker/registry/conf/docker-registry.htpasswd文件.

* 安装htpasswd 如果该命令已安装，可以略过此步,否则利用如下命令进行安装

```
sudo yum install httpd-tools -y
```

* 创建用户和密码

```
sudo htpasswd -c /opt/docker/registry/conf/docker-registry.htpasswd xl
```

第一个用户需要加-c参数，随后输入密码并确认。添加新用户不需要加-c参数。 
例如：创建第二个用户

```
sudo htpasswd /opt/docker/registry/conf/docker-registry.htpasswd testu
```

### 运行Nginx

```
sudo docker run -d -p 443:443  -e REGISTRY_HOST="docker-registry" -e REGISTRY_PORT="5000" -e SERVER_NAME="localhost" --link docker-registry:docker-registry -v /opt/docker/registry/conf/docker-registry.htpasswd:/etc/nginx/.htpasswd:ro -v /opt/docker/registry/conf:/etc/nginx/ssl:ro --name docker-registry-proxy containersol/docker-registry-proxy
```

<div class="alert alert-warning">
		这里使用了一个镜像去创建nginx容器，如果我们利用独立的nginx去进行配置的话，要求nginx版本在1.7.5以上才能支持nginx.conf中add_header等配置。如果是作为内网使用，建议采用nginx容器这种方式就行。如果允许让外网访问，建议先拷贝docker-registry-proxy容器中nginx.conf配置的内容，然后根据实际情况调整upstream中相关ip,docker-registry.key,docker-registry.htpasswd等文件存放的位置。注意这块nginx.conf配置的server非常重要，需要配置为之前提到的域名或别名。
</div>

### docker 基本概念

* ENV  指定一个环节变量，会被后续 RUN 指令使用，并在容器运行时保留

```
ENV <key> <value>       # 只能设置一个变量
ENV <key>=<value> ...   # 允许一次设置多个变量
```

* ENTRYPOINT   配置容器启动后执行的命令，并且不可被 docker run 提供的参数覆盖，而 CMD 是可以被覆盖的。如果需要覆盖，则可以使用 docker run --entrypoint 选项。
每个 Dockerfile 中只能有一个 ENTRYPOINT，当指定多个时，只有最后一个生效。

```
ENTRYPOINT [“executable”, “param1”, “param2”] (the preferred exec form，优先选择)
ENTRYPOINT command param1 param2 (shell form)
```

* VOLUME  创建一个可以从本地主机或其他容器挂载的挂载点

```
VOLUME ["/data"]
```

* WORKDIR  为后续的 RUN、CMD、ENTRYPOINT 指令配置工作目录。可以使用多个 WORKDIR 指令，后续命令如果参数是相对路径，则会基于之前命令指定的路径。

```
WORKDIR /path/to/workdir
```

