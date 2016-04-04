---
layout: post
title: "angular小技巧"
description: "angular JS使用过程中的一些小技巧分享"
category: 技术
tags: [angular]
---

## ng-class用法
```
ng-class="{admin:'enabled', moderator:'disabled', '':'hidden'}[user.role]"
```

## 绑定显示`html`内容
* 引入angular-sanitize.js

* 导入ngSanitize
```
angular.module('mySceApp', ['ngSanitize'])
```

* controller中引入 $sce
```
controller('AppController', ['$http', '$templateCache', '$sce']
```

* 在赋值html内容时，使用
```
 $scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(someHtmlVar);
```

* 最后在，页面上使用
```
 <span ng-bind-html="userComment.htmlComment" class="htmlComment"></span>
```

