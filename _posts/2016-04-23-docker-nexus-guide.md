---
layout: post
title: "nexus docker 指南"
description: "nexus docker 指南"
category: 技术
tags: [nexus, docker]
---

 From  <https://hub.docker.com/r/sonatype/nexus/>

 ```
$ mkdir /some/dir/nexus-data && chown -R 200 /some/dir/nexus-data
$ docker run -d -p 8081:8081 --name nexus -v /some/dir/nexus-data:/sonatype-work sonatype/nexus
```
