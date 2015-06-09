---
layout: post
title: "GoLang 学习笔记"
description: "golang study"
category: 技术
tags: [golang]
---

Read [Go by Example 中文](http://everyx.in/gobyexample/)

    f:=”short”
`:= `语句是申明并初始化变量的简写，例如这个例子中的 `var f string = “short”`

## `const` 用于声明一个常量

    fmt.Println(int64(d))
数值型常量是没有确定的类型的，直到它们被给定了一个类型，比如说一次显示的类型转化

    fmt.Println(math.Sin(n))
当上下文需要时，一个数可以被给定一个类型，比如变量赋值或者函数调用。举个例子，这里的 `math.Sin`函数需要一个 float64 的参数。

<!--break-->

## `for` 是 Go 中唯一的循环结构
最常用的方式，带单个循环条件。
  
    i:=1
    for i<=3{
      fmt.Println(i)
      i=i+1
    }
	
经典的初始化/条件/后续形式 `for` 循环。

    for j:=7; j<=9 ;j++ {
      fmt.Println(j)
    }

不带条件的 `for` 循环将一直执行，直到在循环体内使用了`break` 或者 `return` 来跳出循环。

    for{
      fmt.Println(“loop”)
      break
    }
	
在`if`条件语句之前可以有一个语句；任何在这里声明的变量都可以在所有的条件分支中使用。

	if num:=9; num<0 {
	  fmt.Println(num,”is negative”)
	} else if num<10 {
	  fmt.Println(num,”has 1 digit”)
	}else{
	  fmt.Println(num,”has multiple digits”)
	}

## switch的用法

在一个 `case` 语句中，你可以使用逗号来分隔多个表达式。在这个例子中，我们很好的使用了可选的default 分支。

    switch time.Now().Weekday() {
      case time.Saturday, time.Sunday:
        fmt.Println(“it’s the weekend”)
      default:
        fmt.Println(“it’s a weekday”)
    }

不带表达式的 `switch` 是实现 if/else 逻辑的另一种方式。
这里展示了 `case` 表达式是如何使用非常量的。

    t:=time.Now()
    switch {
      case t.Hour()<12:
        fmt.Println(“it’s before noon”)
    default:
        fmt.Println(“it’s after noon”)
    }
	
## 数组

    var a[5] int
    a[4]=100

我们可以使用 array[index] = value 语法来设置数组指定位置的值，或者用 array[index] 得到值。

    fmt.Println(“len:”,len(a))

使用内置函数 `len` 返回数组的长度

    b:=[5]int{1,2,3,4,5}
    fmt.Println(“dcl:”,b)

使用这个语法在一行内初始化一个数组


在典型的 Go 程序中，相对于数组而言，`slice` 使用的更多。
`Slice` 是 Go 中一个关键的数据类型，是一个比数组更加强大的序列接口

    s:=make([]string,3)

不想数组，`slice` 的类型仅有它所包含的元素决定（不像数组中还需要元素的个数）。要创建一个长度非零的空slice，需要使用内建的方法 make。这里我们创建了一个长度为3的 string 类型 slice（初始化为零值）。

    s=append(s,”d”)
    s=append(s,”e”,”f”)
    fmt.Println(“apd:”,s)

作为基本操作的补充，`slice` 支持比数组更多的操作。其中一个是内建的 append，它返回一个包含了一个或者多个新值的 slice。注意我们接受返回由 append返回的新的 slice 值。

    c:=make([]string,len(s))
    copy(c,s)
    fmt.Println(“cpy:”,c)

`Slice` 也可以被 copy。这里我们创建一个空的和 s 有相同长度的 slice c，并且将 s 复制给 c。

    l:=s[2:5]
    fmt.Println(“sl1:”,l)

`Slice` 支持通过 slice[low:high] 语法进行“切片”操作。例如，这里得到一个包含元素 s[2], s[3],s[4] 的 slice。

    l=s[:5]   
	
这个 `slice` 从 s[0] 到（但是包含）s[5]。

    l=s[2:]   

这个 slice 从（包含）s[2] 到 slice 的后一个值。

    t:=[]string{“g”,”h”,”i”}
    fmt.Println(“dcl:”,t)

我们可以在一行代码中申明并初始化一个 `slice` 变量。
	

## 关联数组 map
要创建一个空 `map`，需要使用内建的 make:make(map[key-type]val-type).
    m:= make(map[string]int)


使用 name[key] 来获取一个键的值

    v1:= m[“k1″]  
	
内建的 delete 可以从一个 map 中移除键值对

     delete(m, "k2")

申明和初始化一个新的map

    n := map[string]int{"foo": 1, "bar": 2}


## Range 遍历
range 来统计一个 slice 的元素个数。数组也可以采用这种方法。

    for _, num := range nums {
        sum += num
    }

range 在数组和 slice 中都同样提供每个项的索引和值

    for i, num := range nums {
        if num == 3 {
            fmt.Println("index:", i)
        }
    }

range 在 map 中迭代键值对。

    kvs := map[string]string{"a": "apple", "b": "banana"}
    for k, v := range kvs {
        fmt.Printf("%s -> %s\n", k, v)
    }

range 在字符串中迭代 unicode 编码。第一个返回值是rune 的起始字节位置，然后第二个是 rune 自己。

    for i, c := range "go" {
        fmt.Println(i, c)
    }

## 函数

Go 需要明确的返回值，例如，它不会自动返回最后一个表达式的值

	func plus(a int, b int) int {
	    return a + b
	}

通过 name(args) 来调用一个函数
    
	res := plus(1, 2)

## 函数多返回值

(int, int) 在这个函数中标志着这个函数返回 2 个 int
	
	func vals() (int, int) {
	    return 3, 7
	}

通过多赋值 操作来使用这两个不同的返回值

	a, b := vals()

如果你仅仅想返回值的一部分的话，你可以使用空白定义符 `_`

	_, c := vals()
    fmt.Println(c)

## 可变参数函数

这个函数使用任意数目的 int 作为参数:

	func sum(nums ...int) {
	    fmt.Print(nums, " ")
	    total := 0
	    for _, num := range nums {
	        total += num
	    }
	    fmt.Println(total)
	}

如果你的 `slice` 已经有了多个值，想把它们作为变参使用，你要这样调用 `func(slice...)`

	nums := []int{1, 2, 3, 4}
    sum(nums...)


## 闭包 匿名函数
这个 `intSeq` 函数返回另一个在 `intSeq` 函数体内定义的匿名函数。这个返回的函数使用闭包的方式 隐藏 变量 i

	func intSeq() func() int {
	    i := 0
	    return func() int {
	        i += 1
	        return i
	    }
	}

我们调用 `intSeq` 函数，将返回值（也是一个函数）赋给`nextInt`。这个函数的值包含了自己的值 i，这样在每次调用 `nextInt` 是都会更新 i 的值

 	nextInt := intSeq()

    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())

## 递归
一个经典的阶乘示例

	func fact(n int) int {
	    if n == 0 {
	        return 1
	    }
	    return n * fact(n-1)
	}

## 指针
> 允许在程序中通过引用传递值或者数据结构

通过`zeroval` 和 `zeroptr` 来比较指针和值类型的不同

`zeroval` 有一个 int 型参数，所以使用值传递.
`zeroval` 将从调用它的那个函数中得到一个 `ival`形参的拷贝
	
	func zeroval(ival int) {
	    ival = 0
	}

`zeroptr` 有一和上面不同的 `*int`参数，意味着它用了一个 int指针。函数体内的 `*iptr` 接着解引用 这个指针，从它内存地址得到这个地址对应的当前值。**对一个解引用的指针赋值将会改变这个指针引用的真实地址的值**。
	
	func zeroptr(iptr *int) {
	    *iptr = 0
	}

通过 `&i` 语法来取得 i 的**内存地址**，例如一个变量i 的指针。

	zeroptr(&i)
    fmt.Println("zeroptr:", i)


## 结构体
> 结构体 是各个字段字段的类型的集合

 person 结构体包含了 name 和 age 两个字段

	type person struct {
	    name string
	    age  int
	}

创建了一个新的结构体元素语法：

	fmt.Println(person{"Bob", 20})

初始化一个结构体元素时指定字段名字:

 	fmt.Println(person{name: "Alice", age: 30})

省略的字段将被初始化为零值:

	fmt.Println(person{name: "Fred"})

`& 前缀生成一个结构体指针`:

	 fmt.Println(&person{name: "Ann", age: 40})

使用点来访问结构体字段

	s := person{name: "Sean", age: 50}
    fmt.Println(s.name)

`对结构体指针使用. - 指针会被自动解引用`

 	sp := &s
    fmt.Println(sp.age)

## 结构体是可变的

	sp.age = 51
    fmt.Println(sp.age)

## 在结构体类型中定义`方法`