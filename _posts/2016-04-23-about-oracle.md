---
layout: post
title: "oracle 相关问题"
description: "oracle 相关问题"
category: 技术
tags: [oracle]
---

### 检查oralce版本号

```
SELECT * FROM PRODUCT_COMPONENT_VERSION;
```

### 连接Oracle时报错ORA-12541: TNS: 无监听程序

步骤参考<http://jingyan.baidu.com/article/03b2f78c7a0ab75ea237ae33.html>

### oracle 的数据导出与导入

* 导出

```
exp  gsm/gsmlcqb.com@ORCL_PIPTEST file=D:\exp\CRIMINALINFO.dmp log=D:\exp\CRIMINALINFO.log tables=CRIMINALINFO 
```

* 创建表空间

```
create tablespace GSM_DATA datafile 'D:\APP\WALLDATA\gsmdata01.DBF' size 10m autoextend on
```

* 导入

```
imp system/xWall123456 file=D:\exp\CRIMINALINFO.dmp log=CRIMINALINFO.log fromuser=gsm touser=unlogin tables=CRIMINALINFO
```

### oracle 中创建function

```
CREATE OR REPLACE
FUNCTION STRING2NUMBER (p_string varchar2) RETURN NUMBER
IS
  v_decimal char;
BEGIN
  SELECT substr(VALUE, 1, 1)
  INTO v_decimal
  FROM NLS_SESSION_PARAMETERS
  WHERE PARAMETER = 'NLS_NUMERIC_CHARACTERS';
  return to_number(replace(p_string, '.', v_decimal));
END;
/

select string2number('123.456789') from dual;
```

### 创建基于函数的索引

常用与UPPER、LOWER、TO_CHAR(date)等函数分类上，例

```
create index idx_func on emp (UPPER(ename)) tablespace tablespace_name;
```