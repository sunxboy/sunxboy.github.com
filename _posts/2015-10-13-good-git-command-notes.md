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

### 当git add -A后，如何恢复add的操作?

	git reset
	
### 当添加新的ignore 后，如何将远程ignore的文件（夹）删除？

	git rm -r --cached some-directory
	git commit -m 'Remove the now ignored directory "some-directory"'
	git push origin master

### 当git commit 后，如何恢复commit的操作？

	git log
	
```
commit a867b4af366350be2e7c21b8de9cc6504678a61b`
Author: Me <me@me.com>
Date:   Thu Nov 4 18:59:41 2010 -0400

blah blah blah...

commit 25eee4caef46ae64aa08e8ab3f988bc917ee1ce4
Author: Me <me@me.com>
Date:   Thu Nov 4 05:13:39 2010 -0400

more blah blah blah...

commit 0766c053c0ea2035e90f504928f8df3c9363b8bd
Author: Me <me@me.com>
Date:   Thu Nov 4 00:55:06 2010 -0400

And yet more blah blah...

commit 0d1d7fc32e5a947fbd92ee598033d85bfc445a50
Author: Me <me@me.com>
Date:   Wed Nov 3 23:56:08 2010 -0400

Yep, more blah blah.
```

然后

	git checkout 0d1d7fc32
	
可参考： <http://stackoverflow.com/questions/4114095/revert-to-a-previous-git-commit >


### Git 克隆指定分支(master)
```
git clone git@github.com:name/app.git -b master
```

### Git 切换到其它分支(develop)
```
git checkout develop
```

### Git 删除分支(myfeature)
```
git branch -d myfeature
```

### Git 删除远程分支
```
git push origin :branchName
```

### Git 将新分支推送到远程服务器
```
git push -u origin mynewfeature
```

### git比较本地与远程代码
Don't do a `pull` :

> do a `fetch` (the syntax is the same as `git pull`, but it doesn't automatically merge)
> do a `diff` between your dest branch and the other branch
> do a `merge` if you want

### 显示git注释细节

	git show <commit-id>

	git log -p

	git log --pretty=format:"%h %s" --graph

### `git commit` 多行消息
```
git commit -m "this is
> a line
> with new lines
> maybe"
```

### git中文编码支持
```
echo "export LESSCHARSET=utf-8" > $HOME/.profile
git config --global gui.encoding utf-8
git config --global i18n.commitencoding utf-8
git config --global i18n.logoutputencoding gbk
```

### 删除某一文件

```
git rm .....xxxxxxx
```

### 应用stash变更

···
git stash apply
···

