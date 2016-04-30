---
layout: post
title: "centos 下安装sqlplus"
description: "centos 下安装sqlplus"
category: 技术
tags: [centos]
---

Go to [Oracle Linux x86-64 instant clients](http://www.oracle.com/technetwork/topics/linuxx86-64soft-092277.html) download page

### Download the matching client
```
oracle-instantclient11.2-basic-11.2.0.2.0.x86_64.rpm
oracle-instantclient11.2-sqlplus-11.2.0.2.0.x86_64.rpm
```

### Install
```
rpm -ivh oracle-instantclient11.2-basic-11.2.0.2.0.x86_64.rpm
rpm -ivh oracle-instantclient11.2-sqlplus-11.2.0.2.0.x86_64.rpm
```

### Set environment variables in your `~/.bash_profile`
```
ORACLE_HOME=/usr/lib/oracle/11.2/client64
PATH=$ORACLE_HOME/bin:$PATH
LD_LIBRARY_PATH=$ORACLE_HOME/lib
export ORACLE_HOME
export LD_LIBRARY_PATH
export PATH
```

Reload your `.bash_profile` by simply typing `source ~/.bash_profile` (suggested by jbass) or Log-out user and log-in again.

Now you're ready to use SQL*Plus and connect your server. Type in:

```
sqlplus "username/pass@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.2.1)(PORT=1521))(CONNECT_DATA=(SID=YOURSID)))"
```