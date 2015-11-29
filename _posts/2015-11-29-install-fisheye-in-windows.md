---
layout: post
title: "在Windows上安装FishEye"
description: "在Windows上安装FishEye"
category: 技术
tags: [fisheye]
---

### 检查支持的平台

你最好在安装前，先检查你的软硬件环境是否符合 Supported platforms 的要求。
Atlassian 仅支持在 x86 硬件或 运行在x86硬件上派生的64位

### 检查Java版本

通过命令行检查
```
java -version
```
Java版本必须为 1.6.0 或更高版本. 如果你希望 将FishEye作为Windows服务, 请使用 Java Service Wrapper, 你需要使用 32位Java (即使运行在64位服务器上), 并且最好使用 JDK 而不是 JRE ( 因为可以使用 -server 等参数).
 
### 检查 Windows 是否能定位到 Java 
Windows 使用 JAVA_HOME 环境变量来定位 Java. 要检查这个变量，可以使用命令行:
```
echo %JAVA_HOME%
```

你应该可以从返回的结果中看到正确的Java安装路径. 我们不建议路径中包含空格, 并且 JAVA_HOME 也应该包含在 PATH 变量中.
 
### 建立FishEye专用用户 (建议)
对于生产环境, 我们建议你创建一个FishEye专用的Windows 用户. 这个用户:
不需要拥有管理员.
只拥有FishEye 安装路径和数据目录的读、写、执行权限. 这个目录在后面说明.
只有读取源代码库的权限. 
如果你创建了一个FishEye专用用户帐号，请确保你可以使用这个用户登录并完成下面的操作.

### 下载 FishEye
从Atlassian 网站下载 [Download FishEye](https://www.atlassian.com/software/fisheye/download)
解压下载的文件到安装路径:
FishEye安装路径不能含有空格. 在这个说明中用 `FishEye home directory`表示
如果你希望大量用户使用这个FishEye, 并且 FishEye 将使用 connected to an external database, 请考虑将 FishEye 安装到数据库服务器不同的服务器中，以提高性能

### 设置 FishEye 数据存储路径

创建  FishEye 数据存储路径, 并通过FISHEYE_INST环境变量来告知  FishEye 数据存储路径文件夹的绝对路径，具体操作如下:
**对于 Windows 7:**
+ 点击 开始 菜单, 搜索 "sys env" 并选择 编辑系统环境变量.
+ 点击 环境变量 按钮, 然后点击 新建  
+ 变量名称输入 "FISHEYE_INST" , 变量值输入 FishEye 数据存储路径 的绝对路径，最后不要输入反斜线.
+ 然后复制 `FishEye home directory` /config.xml 文件到 FishEye 数据存储路径 目录。.

注意，如果FishEye作为Windows 服务启动，需要使用 Java Service Wrapper, FishEye 指定的环境变量，如 FISHEYE_INST 将被忽略 – 你必须在 wrapper.conf 文件中重新设置. 请参考 将FishEye作为Windows服务
<div class="alert alert-warning">
如果你使用大量的源代码库, 我们建议你加大FishEye默认允许打开的文件数量值.
</div>

### 启动 FishEye!
在命令窗口, 切换到 `FishEye home directory` 目录，并运行下面的代码:
```
bin\start.bat
```
几分钟后, 打开浏览器, 前往 http://localhost:8060/ (或者 http://hostname:8060/, hostname 即安装FishEye的机器名称).
输入授权码, 以及管理员密码, 并完成配置步骤. 注意，这里的密码指的是FishEye '内置' 的管理员. 你可以用这个用户登录, 如果有必要, 点击页面底部的 Administration 链接进入管理员界面.
你也可以等配置完成后，再将JIRA与FishEye集成;

### 添加源代码库
现在你可以在FishEye中添加已经配置过的源代码库. 请参见 Starting to use FishEye
FishEye 会对你添加的源代码库进行索引. 如果你正在试用 FishEye, 我们建议你先索引一个项目, 你就可以马上使用 FishEye 了. 如果你索引全部源代码库, 这将耗费大量时间（也许是几天）

### 添加用户和用户组
你可以在FishEye中添加用户和用户组. 你也可以让外部用户目录服务器管理FishEye用户。

## 设置邮件服务器
配置 FishEye 邮件服务器可以让用户获得最新的FishEye通知提醒. 请参见 Configuring SMTP

### 链接到外置数据库 (建议)
如果你希望FishEye运行在生产环境, 我们强烈建议你使用 supported 的外置数据库. 
当然如果你正在试用 FishEye, 你也可以直接使用内置 HSQL 数据库, 日后可以方便的迁移。

### 停止 FishEye (可选)
打开命令窗口, 切换到 <FishEye home directory> 目录，并运行:
```
bin\stop.bat
```

### 优化 FishEye 性能
要使FishEye获得最佳性能。请参见 [Tuning FishEye performance](https://confluence.atlassian.com/fisheye/tuning-fisheye-performance-298976951.html)
 