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

### 查询当前用户的连接到的数据库名

```
SELECT ora_database_name FROM dual
```

### 表数据的导入与导出

```
exp deinonychus/lcxd123@ORCL_PIPTEST file=pip_code_area.dmp tables=CODE_AREA rows=y indexes=n triggers=n grants=n

imp system/xWall123456 file=d:\exp\pip_code_area.dmp log=code_area.log fromuser=deinonychus touser=unlogin buffer=64000 tables=CODE_AREA
```

### 基于 substr 建索引

```
CREATE INDEX my_substr_idx
    ON my_table( substr( my_field,1,6 ) );
```

### 索引重建

```
ANALYZE INDEX index_name COMPUTE STATISTICS 
ANALYZE INDEX index_name VALIDATE STRUCTURE 
ALTER INDEX index_name REBUILD
```

### oracle 设置密码不过期

```
select profile from DBA_USERS where username = '<username>';
alter profile <profile_name> limit password_life_time UNLIMITED;
```

### oracle中插入记录时，自增列自动增长

* 建表

```
CREATE TABLE departments (
  ID           NUMBER(10)    NOT NULL,
  DESCRIPTION  VARCHAR2(50)  NOT NULL);

ALTER TABLE departments ADD (
  CONSTRAINT dept_pk PRIMARY KEY (ID));

CREATE SEQUENCE dept_seq;
```

* 建触发器

```
CREATE OR REPLACE TRIGGER dept_bir 
BEFORE INSERT ON departments 
FOR EACH ROW

BEGIN
  SELECT dept_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;
```
