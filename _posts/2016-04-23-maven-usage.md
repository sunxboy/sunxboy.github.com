---
layout: post
title: "maven 用法"
description: "maven 用法"
category: 技术
tags: [maven]
---

### install jar into local repostory

```
mvn install:install-file -Dfile=classes12_g.jar -DgroupId=com.oracle \
-DartifactId=oracle -Dversion=10.2.0.2.0 -Dpackaging=jar -DgeneratePom=true
```

### 自动上传本地jar到maven 远程库

* 基本命令

```
mvn deploy:deploy-file \
    -Durl=http://192.168.0.152:8081/nexus/content/repositories/thirdparty/ \
    -DrepositoryId=Nexus \
    -DgroupId=com.oracle \
    -DartifactId=ojdbc6 \
    -Dversion=11.2.0.1.0  \
    -Dpackaging=jar \
    -Dfile=ojdbc6-11.2.0.1.0.jar
```

* 注意查看各种repostory的配置中“部署策略”是否为允许

![xxxxxx]({{ site.qiniu_url }}/maven/maven_upload.jpg)