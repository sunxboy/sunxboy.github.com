---
layout: page
title: ZSunSoft Team
tagline: Supporting tagline
---
{% include JB/setup %}

Read [Go by Example 中文](http://everyx.in/gobyexample/)

## Go lang 学习笔记

    f:=”short”
`:= `语句是申明并初始化变量的简写，例如这个例子中的 `var f string = “short”`

`const` 用于声明一个常量

    fmt.Println(int64(d))
数值型常量是没有确定的类型的，直到它们被给定了一个类型，比如说一次显示的类型转化

    fmt.Println(math.Sin(n))
当上下文需要时，一个数可以被给定一个类型，比如变量赋值或者函数调用。举个例子，这里的 `math.Sin`函数需要一个 float64 的参数。
  
`for` 是 Go 中唯一的循环结构
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
	
#switch

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
	
#数组

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
	

#关联数组 map

    m:= make(map[string]int)

要创建一个空 `map`，需要使用内建的 make:make(map[key-type]val-type).

    v1:= m[“k1″]  
	
使用 name[key] 来获取一个键的值



