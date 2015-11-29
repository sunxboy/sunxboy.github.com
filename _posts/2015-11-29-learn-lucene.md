---
layout: post
title: "lucene学习"
description: "lucene作为一款核心搜索库，并不提供任何功能来实现内容获取"
category: 技术
tags: [lucene]
---

lucene作为一款核心搜索库，并不提供任何功能来实现内容获取。

`内容获取软件`
solr ， apatch lucene项目的子项目，支持从关系数据库和xml文档中提取原始数据，集成Tika来处理复杂文档
nutch,apatch lucene子项目，大规模的爬虫工具，抓取和分辨web站点数据
grub, 流行的开源web爬虫工具
Drods, apatch lucene子项目
Aperture, 支持从web站点，文件系统和邮箱中抓取，并解析和索引其中的文本数据。
谷歌企业连接管理工程： google enterprise connector manager

`lucene文档`
标题 title, 正文 body, 摘要 abstract , 作者 author, 链接 url

搜索处理过程就是从索引中查找单词，从而找到包含该单词的文档。搜索质量主要由查准率 precision 和查全率 recall来衡量。
查全率用来衡量搜索系统查找相关文档的能力；
查准率用来衡量搜索系统过滤非相关文档的能力；

lucene的conrib模块，即语法检查器，提供了两个模块功能: 高亮模块和高速向量高亮模块

`建立查询 query`
搜索查询： 查询检索索引并返回与查询语句匹配的文档，结果热处理时按照查询请求来排序

*搜索理论模型*
纯布尔模型，文档不管是否匹配查询请求，都不会被评分。一条查询仅获取所有匹配文档集合的一个子集。
向量空间模型，查询语句和文档都是高维空间的向量模型，这里每一个独立的项都是一个维度。
概率模型，采用全概率方法来计算文档和查询语句的匹配概率。
lucene在实现上采用向量空间模型和纯布尔模型。