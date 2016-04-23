---
layout: post
title: "pl/sql developer 相关问题"
description: "pl/sql developer "
category: 技术
tags: [plsql]
---

### pl/sql developer中文乱码解决

在windows中创建一个名为“NLS_LANG”的系统环境变量，设置其值为`“SIMPLIFIED CHINESE_CHINA.ZHS16GBK”`，然后重新启动 pl/sql developer
