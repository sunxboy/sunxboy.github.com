---
layout: post
title: "在fisheye中添加git repository"
description: "fisheye git repository"
category: 技术
tags: [fisheye]
---

Admin access to FishEye.
Admin access to a GitHub repository.
Git client and SSH client installed on the FishEye server and available in the PATH.

*Instructions*

1. Login to FishEye, go to `Administration` -> `Repositories` and click "Add Existing...".
2. Choose "Git" from the dropdown, give it a name/description and click "Next".
3. Grab the SSH url from your repository in GitHub and enter it into the "Repository Location".
 + Will look something like "git@github.com:ORGANIZATION/REPONAME.git"
4. Under "Authentication Style", choose "Generate key pair for ssh" and click "Generate".
5. Copy the resulting block of text into your clipboard.
6. Go to your repository in GitHub, go to "Admin" and choose the "Deploy Keys" tab.
7. Click "Add another deploy key", name it "FishEye", paste the block of text into the "Key" field and click "Add Key".
8. Back in FishEye, click "Test Connection" and if all is well, click "Next" and then click "Add".

登录git server服务器进入 打开 `~/.ssh/authorized_keys` 添加一行，将 fisheye中生成的公钥copy进去即可。