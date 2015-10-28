---
layout: post
title: "读书笔记: angular性能调优"
description: "angular performance tuning"
category: 技术
tags: [angular]
---


### avoid express which is expensive computation
```
{{myComplexCoputation()}}
```

### avoid Console.log in express method
```
$scope.getNameLog = function () {
console.log('getting name');
return $scope.name;
};
```

### avoid expensive filter code:
```
{{myModel | myComplexFilter}}
```

### Avoid DOM access in the watch-expression

### Remove unnecessary watches

### Don't watch for invisible
```
<div ng-show="false">
<span>{{getNameLog()}}</span>
</div>
```

### Scope.$digest instead of calling Scope.$apply

### Entering the $digest loop less frequently
```
function update() {
element.text(dateFilter(new Date(), 'hh:mm:ss'));
$timeout(update, 1000, false);
}
```

### Limit the number of turns per $digest loop

### Avoid deep-watching whenever possible
```
$scope.user = {
firstName: 'AngularJS',
lastName: 'Superhero',
age: 4,
superpowers: 'unlimited',
// many other properties go here…
};
$scope.$watch('user', function (changedUser) {
$scope.fullName =
changedUser.firstName + ' ' + changedUser.lastName;
}, true);
```

### Consider the size of expressions being watched
```
<p>This is very long text that refers to one {{variable}} defined on a
scope. This text can be really, really long and occupy a lot of space
in memory. It is so long since… </p>
--->
<p>This is very long text that refers to one <span ngbind='
variable'></span> defined on a scope. This text can be really,
really long and occupy a lot of space in memory. It is so long since…
</p>
```

### Collection watching in ng-repeat

its performance is linked to the `size` of a collection

### Many bindings made easy

Collections of over `500` rows are probably a bad fit for the ngrepeat directive.