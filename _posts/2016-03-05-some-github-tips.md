---
layout: post
title: "github 小技巧"
description: "git github"
category: 技术
tags: [git]
---

### github 变基
提取在 C4 中引入的补丁和修改，然后在 C3 的基础上再应用一次。在 Git 中，这种操作就叫做 变基。 你可以使用 rebase 命令将提交到某一分支上的所有修改都移至另一分支上，就好像“重新播放”一样。

![spring resource]({{ site.qiniu_url }}/git/basic-rebase-1.png)

### 提交代码流程
> 将当前的变更暂存 `git stash save 'xxx'`
获取最新代码 `git pull origin master`
执行变基，合并远端的变更到本地 `git pull --rebase`
合并刚刚暂存下来的本地变更 `git stash apply`
提交代码 `git commit -m "xxxxx" || git push origin master`

### git protocol error: bad pack header 错误解决
```
git config --global pack.windowMemory "100m"
git config --global pack.packSizeLimit "100m"
git config --global pack.threads "1" 
```

### 移除origin
```
cp .git/config .git/config.backup
git remote remove origin
mv .git/config.backup .git/config
git fetch
```