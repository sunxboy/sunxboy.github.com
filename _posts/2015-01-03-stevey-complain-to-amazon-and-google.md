---
layout: post
title: "SteveY的吐槽"
description: "SteveY对Amazon和Google平台的吐槽"
category:
tags: [SOA]
---
{% include JB/setup %}

Read [SteveY对Amazon和Google平台的吐槽](http://coolshell.cn/articles/5701.html)

`Steve`在其Google+上作了一些解释，大体是说他喝多了，而且又是在凌晨，所以大脑不清，文章中的观点很主观，极端且不完整.

---
**Amazon每件事都做错了，而Google每件事都做对了**。当然啦，这是很笼统的话，但却是惊人的准确，相当的疯狂吧。大概有一百甚至两百种不同的地方可以让我们去比较这两个公司，而Google可能在每一项都能胜出，如果我记的没错，**除了其中3项以外**.

<!--break-->
---
公平起见，他们的确有套非常非常不错的`版本控制管理系统`，而这是我们（Google）需要尽力赶上他们的地方，他们还有一个`漂亮的发布/订阅系统`，我们也没有相对应的东西。不过，就大体而言，他们有的不过是一堆蹩脚的工具，用关系数据库来读取或写入状态机里的信息中罢了。我们不应该这么搞就算这样做是可以。

---
这就是我所所说的那3件事中的两件事Amazon比Google强的，那就是的他们的发布/订阅系统以及版本控制和管理系统。

但是，他们有一件事做的非常非常好，**其好到可以把其他政治，理念，技术上的消耗和混乱完全弥补回来**。

---
有一天，Jeff Bezos下了一份命令。当然，他总是这么干，这些命令对人们的影响来说就像用橡皮槌敲击蚂蚁一样。这个命令大概是2002年，我想误差应该是在正负1年内 —— 这个命令发布的范围非常地广，设想很大，让人眼珠子鼓出来的那种，这种惊讶程度和其他的命令相比，就好像你突然收到公司给你的奖金一样让人惊讶。

---
这份命令大概有如下几个要点:

> * 所有团队的程序模块都要以通过`Service Interface` 方式将其数据与功能开放出来。(Service Interface也就是Web Service) 

> * 团队间的程序模块的信息通信，都要通过这些接口。

> * 除此之外没有其它的通信方式。其他形式一概不允许：不能使用直接链结程序、不能直接读取其他团队的数据库、不能使用共享内存模式、不能使用别人模块的后门、等等，等等，唯一允许的通信方式只能是能过调用 `Service Interface`。

> * 任何技术都可以使用。比如：HTTP、Corba、Pubsub、自定义的网络协议、等等，都可以，Bezos不管这些。

> * 所有的`Service Interface`，毫无例外，都必须从骨子里到表面上设计成能对外界开放的。也就是说，团队必须做好规划与设计，以便未来把接口开放给全世界的程序员，没有任何例外。

> * 不这样的做的人会被炒鱿鱼。

---
在接下来的几年，Amazon内部转变成面向服务架构SOA(Service-Oriented Architecture)，在这华丽转身的过程中，他们学到了相当巨多巨多的东西。我在的那个时候，世界上就有很多很多的关于SOA的学术文档，但在Amazon的那种超大规模的面前，世间的这些文档就好像告诉印第安纳琼斯过马路前要先看看两边有没有来车一样没用，Amazon的研发工程师们在这个过程中发现了很多很多的问题，并从中学到了很多。

---

从Bezos颁布法令的时间到我离开的时候，Amazon已经把文化转变成了`“一切以Service第一”`为系统架构的公司，今天，这已经成为他们进行所有设计时的基础，包括那些绝不会被外界所知的仅在内部使用的功能。

那时，如果没有被解雇的的恐惧他们一定不会去做。我是说，他们今天仍然怕被解雇，因为这基本上是那儿每天的生活，为那恐怖的海盗头子Bezos工作。不过，他们这么做的确是因为他们已经相信Service这就是正确的方向。他们对于SOA的优点和缺点没有疑问，某些缺点还很大，也不疑问。但总的来说，这是正确的，因为，**SOA驱动出来的设计会产生出平台（Platform）**。

---
那三件Amazon比Google强的中的最后一件事是，`Google很不会做平台（Platform）`。**我们就不懂什么是平台。我们就根本不知道平台的内涵**。你们其中一些人明白，但是你们是少数派。

---
Google+是我们完全失败的不懂Platform最明显的例子，从最高层的管理层（嗨，Larry、Sergey、Eric、Vic，你们好）一直到最最底层的员工（嘿，你）都不懂。我们全部统统都不懂。平台Platform的黄金守则是`Eat Your Own Dogfood`（吃你自己的狗食——自己都要用自己的平台）。Google+这个平台是个杯具的事后抄袭者。我们在发布它的时候完全没有任何API。我查了一下，目前也只有少得可怜的API。Google+的一个团队的成员在发布API时告诉我这个事，我问：“这是Stalker API（用来偷窥内部数据的API）吗？”，她郁闷地说，“是啊”。我的意思是，我那只是个玩笑话，但是，不，我们提供的唯一的API就是取得某人的信息流，所以，我想我把玩笑开到自己头上了。

---
Microsoft知道**“狗食守则”**至少有20年了。这已经成为他们世世代代文化的一部分了。不能是你吃人类的食物而给你的开发人员们喂狗食。那样做只会是为了短期的成功而掠夺了平台长期价值。平台就是要你考虑得长远。

---
平台的黄金守则，`“Eat Your Own Dogfood 吃自己的狗食”`，换句话说，“先打造出自己使用平台，然后把它用在所有的地方”。你不能事后再做，那样做就太困难了——你去问问那些把MS Office平台化、把Amazon平台化的人。如果你放在后面做，那么你比一开始要花十倍的精力才能做对。你不能作弊，你不能让内部软件走秘密通道以取得特定的优先权限，不为什么，你必需从一开始就要解决这个问题。

---
老实说，我不知道这篇文章怎么收尾。我今天在这里说得太多了。因为这篇文章花了我6年时间。请包涵我言语冒犯之处，包涵我可能误解了一些产品，团队，或某个人。也许我们真的在开始做了很多平台方面的东西，只是我没看到。我只想说声对不起。

但是，`我们现在开始必需把事做对了`！