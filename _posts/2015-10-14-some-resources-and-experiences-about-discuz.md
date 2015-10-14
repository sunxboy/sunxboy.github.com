---
layout: post
title: "有关discuz的资源与一些经验积累"
description: "有关discuz的资源与使用经验积累"
category: 技术
tags: [discuz]
---

### discuz x3.2 [最新官方下载](http://download.comsenz.com/DiscuzX/3.2/)

### discuz 3 [使用手册](http://faq.comsenz.com/library/x3/index.html )

### discuz [使用教程](http://www.3lian.com/zhuanti/type84.html)

### discuz 3.2 [代码分析](http://www.3qphp.com/category/kaiyuan/discuz/)

### Discuz [用户登录机制分析](http://blog.sina.com.cn/s/blog_63426ff90100ieic.html) 

### discuz.3.2 部署在BAE3.0时`no database selected 13003`问题解决

找到文件`uc_client/model/base.php` 79行： connect方法传参中 ‘’替换为 `UC_DBNAME`

### Discuz3.2 [云储存插件](http://bbs.aliyun.com/read/193829.html)



### [常用网站如何使用Ftp4oss服务](http://old.ftp4oss.com/help/UseHelp_Discuz.htm)

### BAE3.0入门：[移植Discuz X3.1论坛系统](http://godbae.duapp.com/?p=914)


### 源码分析：登录流程(login)

```php
base.php -> base()  :
->init_var
->init_db
->init_cache
->init_note
->init_mail
```

### 源码分析：上传流程(ftp)

```php
function_core.php -> ftpcmd()
```

### 源码分析：上传功能

```
admincp\admincp_checktools.php
```

### 源码分析：更改log路径

- 查找：data/log，更改 discuz_root/logs 为 /home/bae/log 
详情如下：

	admincp_checktools.php 不改
	admincp_logs.php 1处
	admincp_tools.php  不改
	discuz_error.php 1处
	helper_log.php 1处
	admin\log.php 1处
	func.inc.php 不改
	var.inc.php 不改
	model\admin.php 2处

- 找到文件extend\vendor\storage\aliyun\sdk.class.php 大约1982行改： `$log_path = '/home/bae/log'.DIRECTORY_SEPARATOR;`


### Discuz! 配置文件中的安全设置

不同的站点对安全级别的要求不同，Discuz! 允许站点管理者，通过自定义配置文件中的 config.inc.php 中的论坛安全设置来自由调整站点的安全级别，同时也可以增强论坛的安全性能和防御性能。

![安全设置](/assets/images/discuz-tips/security-1.gif)

上图是 Discuz! 默认安装后，config 文件的默认设置，如果管理员需要更改此安全设置，可以在论坛目录下，找到 config 文件后打开，修改后保存即可。编辑配置文件时可使用记事本或其他编程软件。
下面对此处关系到论坛安全设置的选项加以说明：

- `$forumfounders = '1';`**论坛创始人 UID**
可以支持多个创始人，之间使用 “,” 分隔。创始人的权限会高于普通管理员，后台有些重要的功能只有创始人登录后，才可以进行管理，如：管理管理人员、模板管理、数据库备份与恢复、进入UCenter等，所以通过设置论坛的创始人账号，可以很大程度的提升论坛的安全级别。添加论坛创始人的方法请见：http://faq.comsenz.com/viewnews-861

- `$attackevasive = 0;`**论坛防御级别**
可防止大量的非正常请求造成的拒绝服务攻击。
各项数据的含义为：

> 0 = 关闭, 
1 = cookie 刷新限制, 
2 = 限制代理访问, 
4 = 二次请求, 
8 = 回答问题(第一次访问时需要回答问题)。

如果需要设置多种防御级别，可以使用`|`将各项级别数进行组合，例如：即限制代理访问又要求第一次访问时需要回答问题时，可以设置此项为`2|8`。

- `$urlxssdefend = 1;` **论坛访问页面防御开关**
可避免用户通过非法的url地址对本站用户造成危害，默认数值为 1，即打开，不建议修改为 0.

- `$admincp = array();`**对管理员帐号的安全设置**
 + `$admincp['forcesecques'] = 0;`
管理人员必须设置安全提问才能进入系统设置, 0=否, 1=是[安全]。此项为对论坛有管理权限的人员进入后台增加了一道安全屏障，只有管理员密码和安全提问两项全部填写正确，才能进入后台。
 + `$admincp['checkip'] = 1;`
后台管理操作是否验证管理员的 IP, 1=是[安全], 0=否。仅在管理员无法登陆后台时设置 0。
设置验证管理员的IP，可以防止该管理员帐号在多处登录论坛后台，保障同一帐号对后台进行管理的唯一性。
 + `$admincp['tpledit'] = 0;`
是否允许在线编辑论坛模板 1=是 0=否[安全]
默认为 0，当设置为 1 时，管理员可以在 **管理中心** => **界面** => **模板管理** => **相应模板的详情** 中看到“编辑”、“删除”的字样，否则只可以看到“查看”的字样，即不允许在线编辑模板。一般情况下，不建议将此项设置成允许在线编辑，把模板文件复制出来后再进行编辑，可以保证原模板文件的完整性，对于修改不当后产生的页面错误问题可以得到及时的恢复。

![discuz 模板](/assets/images/discuz-tips/security-2.gif)

- `$admincp['runquery'] = 1;`
是否允许后台运行 SQL 语句 1=是 0=否[安全]
默认为 1，即管理员可以在 管理中心 => 工具 => 数据库 => 升级 中看到可输入自定义 SQL 语句的文本框，当修改为 0 时，此文本框不显示，只能在后台运行程序内置的 SQL 语句。当允许运行 SQL 语句时，除非保证语句完全正确，否则不要轻易运行，并且运行 SQL 语句前，一定要做好备份，否则运行不当，造成数据丢失或数据库损坏，后果十分严重。

![数据库](/assets/images/discuz-tips/security-3.gif)

- `$admincp['dbimport'] = 1;`
是否允许后台恢复论坛数据 1=是 0=否[安全]
默认为 1，即允许管理员在 **管理中心** => **工具** => **数据库** => **恢复** 中恢复数据，当修改为0时，选择此项后，会出现不允许恢复数据的提示。当确定了要恢复的备份文件是最新的，正确的之后，再允许恢复数据，可以有效地防止恢复错误的备份导致论坛数据丢失的情况。

![备份](/assets/images/discuz-tips/security-4.gif)