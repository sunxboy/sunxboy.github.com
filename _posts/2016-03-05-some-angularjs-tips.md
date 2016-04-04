---
layout: post
title: "angularjs 小技巧"
description: "angularjs"
category: 技术
tags: [angularjs]
---

### angularjs 调用时设置timeout
```
var myapp = angular.module("myapp", []);

myapp.controller("MyController", function($scope, $timeout){

    $timeout(callAtTimeout, 3000);

});

function callAtTimeout() {
    console.log("Timeout occurred");
}
```

### 在angular中`extend` javascript object

```Javascript
angular.extend($scope.logEntry, {
    stationId : log.stationId,
    serverType : log.serverType
});
```