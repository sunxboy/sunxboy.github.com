---
layout: post
title: "git 相关命令总结"
description: "git 相关命令总结"
category: 技术
tags: [git]
---

### 第一次同步远程与本地

	git push -u origin master

### 查看远程库信息

	git remote -v

## **Git鼓励大量使用分支**

### 查看分支：`git branch`

### 创建分支：`git branch <name>`

### 切换分支：`git checkout <name>`

### 创建+切换分支：`git checkout -b <name>`

### 合并某分支到当前分支：`git merge <name>`

### 删除分支：`git branch -d <name>`


### 创建远程origin的dev分支到本地

	git checkout -b dev origin/dev

在dev上继续修改，然后，时不时地

### 把dev分支push到远程

	git push origin dev

如果另一个也试图push到dev，就会失败，即使git pull也失败。
需要

### 设置dev和origin/dev的链接

	git branch --set-upstream dev origin/dev
	
再`git pull`

`git pull`成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。

解决后，

### 提交到分支

	git push origin dev

因此，多人协作的工作模式通常是这样：

> 首先，可以试图用`git push origin branch-name`推送自己的修改；

> 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；

> 如果合并有冲突，则解决冲突，并在本地提交；

> 没有冲突或者解决掉冲突后，再用`git push origin branch-name`推送就能成功！

> 如果`git pull`提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream branch-name origin/branch-name`

这就是多人协作的工作模式，一旦熟悉了，就非常简单。