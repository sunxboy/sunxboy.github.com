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

> Login to FishEye, go to `Administration` -> `Repositories` and click "Add Existing...".
> Choose "Git" from the dropdown, give it a name/description and click "Next".
> Grab the SSH url from your repository in GitHub and enter it into the "Repository Location".
> Will look something like "git@github.com:ORGANIZATION/REPONAME.git"
> Under "Authentication Style", choose "Generate key pair for ssh" and click "Generate".
> Copy the resulting block of text into your clipboard.
> Go to your repository in GitHub, go to "Admin" and choose the "Deploy Keys" tab.
> Click "Add another deploy key", name it "FishEye", paste the block of text into the "Key" field and click "Add Key".
> Back in FishEye, click "Test Connection" and if all is well, click "Next" and then click "Add".