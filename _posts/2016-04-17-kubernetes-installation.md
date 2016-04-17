---
layout: post
title: "安装 Kubernetes"
description: "安装 Kubernetes"
category: 技术
tags: [Kubernetes]
---

### 安装 docker (yum install docker-io)

### 增加 Kubernetes 的 yum 源

```
cat <<EOF>> /etc/yum.repos.d/virt7-docker-common-release.repo
[virt7-docker-common-release]
name=virt7-docker-common-release
baseurl=http://cbs.centos.org/repos/virt7-docker-common-release/x86_64/os/
gpgcheck=0
EOF
```

### 安装

```
yum install --enablerepo=virt7-docker-common-release kubernetes etcd
```

### 禁用防火墙，因为 docker 并不擅长防火墙规则管理

```
systemctl disable iptables-services firewalld
systemctl stop iptables-services firewalld
```

### 启动

```
systemctl restart　etcd
systemctl restart　kube-apiserver 
systemctl restart　kube-controller-manager 
systemctl restart　kube-schedule
systemctl restart　kube-proxy
systemctl restart　kubelet 
systemctl restart　docker
```

### 检查 Kubernetes 运行

```
kubectl get nodes
```

### 启动mysql的例子

创建文件 `mysql-pod.yaml`

```
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  labels:
    name: mysql
spec:
  containers:
    - resources:
        limits :
          cpu: 0.5
      image: docker.io/mysql
      name: mysql
      env:
        - name: MYSQL_ROOT_PASSWORD
          # change this
          value: "111111"
      ports:
        - containerPort: 3306
          hostPort: 3326
          name: mysql
      volumeMounts:
          # name must match the volume name below
        - name: mysql-persistent-storage
          # mount path within the container
          mountPath: /var/lib/mysql
  volumes:
    - name: mysql-persistent-storage
      hostPath:
        path: /home/arnes/kubernetes/mysql-kube-data
```

### 启动这个pod

```
kubectl create -f mysql-pod.yaml
```

#### 检查状态

```
kubectl get pods
kubectl get pods mysql
kubectl describe pod mysql 
```

### ＂API token found for service account default/default＂错误的解决办法

```
openssl genrsa -out /tmp/serviceaccount.key 2048
vim /etc/kubernetes/apiserver:
KUBE_API_ARGS="--service_account_key_file=/tmp/serviceaccount.key"
vim /etc/kubernetes/controller-manager
KUBE_CONTROLLER_MANAGER_ARGS="--service_account_private_key_file=/tmp/serviceaccount.key"
systemctl restart kube-controller-manager.service
```