---
layout: post
title: "knockout和js测试基础"
description: "knockout jasmine spy 测试 知识"
category: 技术
tags: [javascript, knockout, jasmine, spy]
---

## knockout 基础知识

### 显示文本的绑定

这是一种最简单的绑定类型，knockout JS定义了如下的绑定属性：

+ text : 在dom元素中显示的文本内容，通常为string类型，包含在<...><.../>中。
+ html : 在dom元素中显示带有html标记的内容(需要小心脚本注入漏洞)
+ style : 控制dom元素的style属性
+ css : 允许添加和删除dom元素的css类
+ attr : 选择性的控制对dom元素有效的属性的值
+ visible : 用来控制dom元素是否显示，为boolean型


### 控制与循环的绑定

knockout 提供了一系列对整个页面中一小段代码进行在何种条件下是否存在进行控制的绑定，它们是：

+ foreach : 对一个dom元素重复多次，通常结合数组与列表或表格dom进行绑定。
+ if : 用一个boolean值为控制页面中dom元素物理上是否存在，当if条件中计算的值为false时，对应的绑定信息不会执行
+ ifnot : 与 if 相反
+ with : 允许你改变当前绑定的上下文，通常此时ViewModel是存在的。这种绑定允许你在一个父节点的绑定中开始使用子节点的ViewModel

### 绑定的上下文

非常容易，因为knockout js 公开了一系列用于此绑定的属性：

+ $data : 指当前引用的ViewModel
+ $parent : 当前引用ViewModel的父ViewModel
+ $parents : 当前引用ViewModel的继承树( $parents[0] 是指父亲,  $parents[1] 是指爷爷, 以此类推)
+ $root :  当前引用ViewModel继承树的根
+ $index : 仅仅出现在foreach绑定中，它是指从0开始计数的数组的索引
+ $context : 当前绑定的上下文(`不常用`)
+ $parentContext : 当前绑定的上下文的父亲(`不常用`)
+ $element : 指当前绑定的dom元素

### 表单控制的绑定

有：

+ click : 关联到ViewModel的方法来响应click事件，绑定的上下文$data和javascript事件对象会自动作为参数传递。
+ event : 关联到ViewModel的方法来响应一个或多个dom事件，绑定的上下文$data和javascript事件对象会自动作为参数传递。
+ submit : 关联到ViewModel的方法来响应表单的提交事件，仅对form表单有效，不要使用click事件绑定来管理表单的提交。
+ enable : 用boolean的值来控制dom元素的状态是否active
+ disable : 与 enable 相反
+ value : 用来关联到dom元素的value属性，特别有用的是当你需要更新一个input 元素绑定的值的时候。这个绑定允许一个可选项“valueUpdate”,当update事件触发时就会更新值。默认情况是当元素失去焦点时。

这里有三种可能的情况：

+ input 当元素的value发生修改时，会与修改的内容保持同步的变更(仅在支持新技术的浏览器中)
+ keyup 当键松开的时候会触发事件
+ keypress 当键压下的时候触发事件，如果键被持续按下，会被触发多次。
+ afterkeydown 当每次完成按下键的动作后，会被触发。如果键被持续按下，不会触发。
+ hasfocus 用boolean的值来控制dom元素是否得到焦点。
+ checked 用boolean的值来控制checkbox或radio是否被选中
+ options 用来关联一个select下的option 列表属性，通常为数组类型，即可以是简单的字符数组，也可以是复杂的对象的数组。它允许一系列选项，比较重要的有：
    - optionsText : option标签的text属性，当元素数组是对象类型时需要指定
    - optionsValue : option标签的value属性，当元素数组是对象类型时需要指定
    - optionsCaption : 类似"Select an item please."的提示标签，可选项
    - value : 关联到选择框中被选择的单个项的值（当选择框为单选时）
    - selectedOptions : 关联到选择框中被选择的多个项的值（当选择框为多选时）
+ uniqueName : 确信关联的dom元素是非空的唯一的属性名，如：uniqueName: true

### 自定义绑定

自定义的绑定被定义成 ko.bindingHandlers对象的新的属性，包含两个功能：
 
+ init : 只被调用一次，当dom元素被初始化时执行。
+ update : 当每次关联到的对象状态发生变化时被调用。

两个功能均有相同的参数列:

+ element : 关联到的dom元素
+ valueAccessor : 一个javascript方法用来访问当前的ViewModel属性，为了获取属性的值，需要借助 ko.unwrap
+ allBindings : 一个javascript方法用来访问当前dom元素的其它声明的属性。
+ viewModel : 最新版本的knockout中不建议使用，它用来指向当前的ViewModel.
+ bindingContext : 当前绑定的上下文，在最新版本的knockout中要访问ViewModel, 请用`bindingContext.$data`


## Jasmine的使用

Jasmine 提供了详细的匹配列表:

+ toBe : 即=== 
+ toEqual : 简单数据类型是否相等
+ toMatch : 正则表达式是否相等
+ toBeDefined ,  toBeUndefined : 未定义的匹配
+ toBeNull : null的匹配
+ toBeTruthy ,  toBeFalsy : boolean的匹配
+ toContain : 验证数组中是否包含某个元素
+ toBeLessThan ,  toBeGreaterThan : 数值大小比较
+ toBeCloseTo : 精密的数学比较
+ toThrow : 验证某方向是否抛出异常

## Spies的使用

### 用法：spyOn(container, "myFunc")
Spy 初始化的选项，包括:

+ callThrough : 直接调用原始方法

用法:

	spyOn(container, "myFunc").and.callThrough();

+ returnValue : 总是返回特定的值

用法:

	spyOn(container, "myFunc").and.returnValue(50);
	
+ callFake : 直接调用某个方法

用法:

	spyOn(container, "myFunc").and.callFake(function (arg) {
		return arg + 10;
	});
	
+ throwError : 总是抛出特定的异常

用法:

	spyOn(container, "myFunc").and.throwError("this is an exception");
	
+ stub : 成为一个桩

用法:

	container.myFunc.and.stub();

### Spy追踪属性

+ any : 被任意调用

```
expect(container.myFunc.calls.any()).toEqual(true);
```	

+ count : 调用计数

```
expect(container.myFunc.calls.count()).toEqual(2);
```

+ argsFor : 调用时的参数

```
expect(container.myFunc.calls.argsFor(0)).toEqual([10]);
```
	
+ allArgs : 调用时的参数列表

```
expect(container.myFunc.calls.allArgs()).toEqual([
	[10],
	[20]
]);
```

+ all : 上下文对象和所有的参数列表

```
expect(container.myFunc.calls.all()).toEqual([
{
	object: container,
	args: [10]
},
{
	object: container,
	args: [20]
}
]);
```
	
+ mostRecent : 最后被调用方法的参数列表的上下文对象

```
expect(container.myFunc.calls.mostRecent()).toEqual({
	object: container,
	args: [20]
});
```
	
+ first : 被调用的方法第一个参数的上下文对象:

```
	expect(container.myFunc.calls.first()).toEqual({
		object: container,
		args: [10]
	});
```
	
+ reset : 清除追踪信息

```
	container.myFunc.calls.reset();
```
	
### 替代spy 初始化API

全局性的spyOn 一个实际对象的方法，Jasmin也提供两个方法去创建spy, 而不需要任何已存在的对象
	
+ createSpy : 创建一个纯的spy,不需要任何实际的方法

```
	//create a spy
	var mySpy = jasmine.createSpy("mySpy");
	//call the spy
	mySpy(23, "an argument");
	//verify expectations as a regular spy
	expect(mySpy).toHaveBeenCalled();
	expect(mySpy).toHaveBeenCalledWith(23, "an argument");
```
	
+ createSpyObj :用一个或多个纯的spy来创建一个mock对象

```
	//create a mock with spies
	var myMock = jasmine.createSpyObj("myMock", ["aSpy",
	"anotherSpy"]);
	//call the spies
	myMock.aSpy();
	myMock.anotherSpy(10);
	//verify expectations as regular spies
	expect(myMock.aSpy).toHaveBeenCalled();
	expect(myMock.aSpy.calls.argsFor(0).length).toEqual(0);
	expect(myMock.anotherSpy).toHaveBeenCalled();
	expect(myMock.anotherSpy).toHaveBeenCalledWith(10);
```
	
## 测试异步的代码

异步代码的测试模式总结，设想一个这样一个经典的服务：

	var MyService = function () {
		this.fetchResult = function (callback) {
		jQuery.ajax("url", {
			success: function (result) {
			callback(result);
			}
		});
		};
	};

fetchResult 将一个callback方法作为参数，只有当ajax调用成功后才会将其作为参数被传入

	describe("Given an async service", function () {
		var myService, myResult;
		beforeEach(function (done) {
		myService = new MyService();
		spyOn(myService, "fetchResult").and.callFake(function
			(callback) {
			setTimeout(function () {
				callback(10);
				done();
			}, 50);
			});
		myService.fetchResult(function (result) {
		myResult = result;
		});
		});
	it("when service is tested with the async pattern, then it can be
		simulated", function (done) {
		expect(myResult).toEqual(10);
		done();
		});
	});