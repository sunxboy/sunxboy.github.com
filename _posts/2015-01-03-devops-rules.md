---
layout: post
title: "DevOps的规则"
description: "DevOps running rules, good experience"
category: 吐槽
tags: [devops]
---


## `Web应用就像餐馆一样`
人们通过其所提供的体验对其进行评价。即使是短暂的中断也会影响服务提供商的口碑或服务水平。**政策和指导方针在防止代价高昂的服务中断中扮演着重要的角色**。不幸的是，它们也能导致不理智决策的产生，从而造成更大的损害。比如公司内“DevOps团队”的建立。**这将导致所有的运维知识都被隔离在一个单独的团队中**。尽管这样一个管理层指令可能预示着DevOps的到来，但它什么都不是。

<!--break-->

---

## 工程师鄙视`无逻辑的`、`官僚主义的规则`
这些规则是前进的障碍物。然而，每家公司至少都会有一些这样的规则。在过去，可能有好的理由在一些问题上制定这样的规则。渐渐地，这些规则过时了。但是，规则制定者不能（或不敢）取消它们。当使用C++代码库时，由于历史原因，被告知不能使用STL；参与的Java项目被坚定地拒绝从1.4迁移到新版本。**任何有过这样经历的人都明白有些措施可能会对生产力产生消极的影响**。

---

##`DevOps`能量来自于合作中的人有着**完全不同**的技能
相比于成员技能单一的团队；一个拥有各种不同技能的团队，包括长满胡子的系统管理员、函数式编程的狂热粉丝，`更有可能构建出可靠和可扩展的服务`。

---

## 成员技术背景的不同使得团队更加`需要明确的规则`
开发者不需要知道为什么使用的自定义Linux内核有着一大串的编译参数。类似地，不是所有人都需要担心代码中有多少单例模式对象的存在。“写shell脚本时必须添加shebang行”，或者“解析用户数据的代码要有单元测试”。**像这样的标准适用于团队中的每一个人，并且会帮助到那些在特定领域内没有足够经验做好事情的人。特定规则只有被适当的使用，才会对团队产生积极的作用**。

---

## `更通用的规则`
像这些Netflix验证只适用于制定高层级决策，但是能够应用地更久。管理团队既需要通用的规则也需要高层级的规则。**诀窍是要及时发现我们制定的规则是否已不再发挥期望的作用**。

---

如果我们到餐馆，打开冰箱门，不同盒子上有着不同的保质期时间。有的可能几个月，比如番茄酱；有的可能几个小时，比如鱼。做饭要用到不同的原料，而每种原料有自己的保质期。保持原料的新鲜，使得最终做出的食物可口，**这是一个厨师的责任**。同样，不仅在我们决定要将什么进行标准化这件事上需要智慧，在**及时发现我们的标准是否已失去意义这件事上也需要真正的智慧**。