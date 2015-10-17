---
layout: post
title: "如何在java中启用jmxremote"
description: "java enable jmxremote"
category: 技术
tags: [jmxremote, java]
---


```
java -Dcom.sun.management.jmxremote.port=9999
	-Dcom.sun.management.jmxremote.authenticate=false
	-Dcom.sun.management.jmxremote.ssl=false 
```