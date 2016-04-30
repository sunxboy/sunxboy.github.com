---
layout: post
title: "Commands to Check Weblogic Server Status"
description: "Commands to Check Weblogic Server Status"
category: 技术
tags: [weblogic]
---

### Admin Server Status

From Domain Home execute the below command

C:\Oracle\Middleware\user_projects\domains\base_domain

```
Java –cp C:\ Oracle\Middleware\wlserver_10.3\server\lib\weblogic.jar  weblogic.Admin  -adminurl t3:\\localhost:7001 –username weblogic –password –weblogic123 GETSTATE
```

You will get output as `“new_Managed_1”: RUNNING`

### Managed Server Status

From Domain Home execute the below command

C:\Oracle\Middleware\user_projects\domains\base_domain

```
Java –cp C:\ Oracle\Middleware\wlserver_10.3\server\lib\weblogic.jar  weblogic.Admin  -adminurl t3:\\localhost:7001 –username weblogic –password –weblogic123 GETSTATE  new_Managed_1
```

You will get output as `“new_Managed_1”: RUNNING`

### Cluster Status

From Domain Home execute the below command

C:\Oracle\Middleware\user_projects\domains\base_domain

```
Java utils:MULTICASTTEST  -N clustername –A clusteraddress –p clusterport –T10 –S 2
```
