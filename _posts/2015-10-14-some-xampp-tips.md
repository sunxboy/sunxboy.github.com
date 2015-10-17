---
layout: post
title: "XAMPP 小技巧"
description: "XAMPP 小技巧"
category: 技术
tags: [xampp]
---

### 如何启用curl 扩展

找到文件 `xampp\apache\bin\php.ini`， 去掉注释

	;extension=php_curl.dll

然后重启 apache service

<div class="alert alert-warning">
 在新版本的XAMPP中，PHP目录变更为xampp\php\php.ini
</div>