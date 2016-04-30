---
layout: post
title: "scala 最佳实践"
description: "scala 最佳实践"
category: 技术
tags: [scala]
---

### 命名

* 对作用域较短的变量使用短名字：
is, js 和 ks等可出现在循环中。

* 对作用域较长的变量使用长名字：
外部APIs应该用长的，不需加以说明便可理解的名字。例如：Future.collect 而非 Future.all

* 使用通用的缩写，避开隐秘难懂的缩写：
例如每个人都知道 ok,err, defn等缩写的意思，而sfri是不常用的。

* 不要在不同用途时重用同样的名字：
使用val(注：Scala中的不可变类型)

* 避免用 `` ` `` 声明保留字变量:
用typ替代 `` `type` ``

* 用主动语态(active)来命名有副作用的操作：
user.activate()而非 user.setActive()

* 对有返回值的方法使用具有描述性的名字：
src.isDefined 而非src.defined

* getters不采用前缀get
用get是多余的: site.count而非site.getCount


* 不必重复已经被package或object封装过的名字：
使用：

```
object User {
  def get(id: Int): Option[User]
}
```

而非：

```
object User {
  def getUser(id: Int): Option[User]
}
```
相比 get 方法 getUser 方法中的User是多余的，并不能提供额外的信息。