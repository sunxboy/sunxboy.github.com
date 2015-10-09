---
layout: post
title: "Discuz!X3.2 升级后ucenter、uc_server密码正确无法登录后台的解决方法"
description: "相信有很多人刚升级到discuz x3.2最新版本后都出现了ucenter和uc_server后台无法登录的问题其实根本不是密码不对，就是最新版本的discuz出现的BUG导致我们无法登录。"
category: 技术
tags: [discuz]
---
相信有很多人刚升级到discuz x3.2最新版本后都出现了ucenter和uc_server后台无法登录的问题
其实根本不是密码不对，就是最新版本的discuz出现的BUG导致我们无法登录。

解决办法很简单
在/uc_server/model 中找到admin.php

找到代码

```php
function adminbase() {
                parent::__construct();
                $this->cookie_status = 0;
                $sid = $this->cookie_status ? getgpc('sid', 'C') :rawurlencode(getgpc('sid', 'R'));
                $this->sid = $this->view->sid = $this->sid_decode($sid) ? $sid : '';
```

修改为

```php
function adminbase() {
                parent::__construct();
                $this->cookie_status = isset($_COOKIE['sid']) ? 1 : 0;
                $sid = $this->cookie_status ? getgpc('sid', 'C') :rawurlencode(getgpc('sid', 'R'));
                $this->sid = $this->view->sid = $this->sid_decode($sid) ? $sid : '';
```
