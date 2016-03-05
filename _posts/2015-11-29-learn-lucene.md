---
layout: post
title: "lucene学习"
description: "lucene作为一款核心搜索库，并不提供任何功能来实现内容获取"
category: 技术
tags: [lucene]
---

lucene作为一款核心搜索库，并不提供任何功能来实现内容获取。

### 内容获取软件

solr ， apatch lucene项目的子项目，支持从关系数据库和xml文档中提取原始数据，集成Tika来处理复杂文档
nutch,apatch lucene子项目，大规模的爬虫工具，抓取和分辨web站点数据
grub, 流行的开源web爬虫工具
Drods, apatch lucene子项目
Aperture, 支持从web站点，文件系统和邮箱中抓取，并解析和索引其中的文本数据。
谷歌企业连接管理工程： google enterprise connector manager

### lucene文档

标题 title, 正文 body, 摘要 abstract , 作者 author, 链接 url

搜索处理过程就是从索引中查找单词，从而找到包含该单词的文档。搜索质量主要由查准率 precision 和查全率 recall来衡量。
查全率用来衡量搜索系统查找相关文档的能力；
查准率用来衡量搜索系统过滤非相关文档的能力；

lucene的conrib模块，即语法检查器，提供了两个模块功能: 高亮模块和高速向量高亮模块

### 建立查询 query

搜索查询： 查询检索索引并返回与查询语句匹配的文档，结果热处理时按照查询请求来排序

#### 搜索理论模型

纯布尔模型，文档不管是否匹配查询请求，都不会被评分。一条查询仅获取所有匹配文档集合的一个子集。
向量空间模型，查询语句和文档都是高维空间的向量模型，这里每一个独立的项都是一个维度。
概率模型，采用全概率方法来计算文档和查询语句的匹配概率。
lucene在实现上采用向量空间模型和纯布尔模型。

### 如何测试？lucene test

可以参数这个例子
<http://svn.apache.org/repos/asf/lucene/dev/trunk/lucene/core/src/test/org/apache/lucene/index/ >

### 推荐书籍

 `Enterprise Lucene and Solr  (2015 by Lajos Moczar )`
 
### 如何加快lucene索引？
 
在这里我们试图来加快Lucene应用的索引的速度，如果想加快查询的速度，请看这里 see ImproveSearchingSpeed
确信你是真的需要加快速度.索引的速度实在是太慢了吗？或者真的是lucene导致的吗？
确认使用了lucene的最新版本.
使用本地文件系统. 远程的文件系统进行索引的时候是很慢的。
使用更快的硬件，特别是IO系统. 如果可能尽量使用SSD硬盘.
打开一个单例的writer并且在索引的session间隔周期中重用它。
刷新内存来代替文档数量.
For Lucene <= 2.2: 在内存消耗过大时，在添加doc后，调用writer.ramSizeInBytes() 然后调用flush()，尤其在有很多数量的小文件时，特别有用。你需要首先设置maxBufferedDocs为足够大，以避免基于文件数量flush(). 当然也不要把文件数量设置得过大，否则会遇到 LUCENE-845问题。一般来说，数值为普通数量2-3倍就可以了。
For Lucene >= 2.3: IndexWriter 能根据内存的使用情况自行调用flush(). 通过调用writer.setRAMBufferSizeMB() 来设置缓存大小.确信不要再去调用setMaxBufferedDocs
Use as much RAM as you can afford.
More RAM before flushing means Lucene writes larger segments to begin with which means less merging later. Testing in LUCENE-843 found that around 48 MB is the sweet spot for that content set, but, your application could have a different sweet spot.
Turn off compound file format.
Call setUseCompoundFile(false). Building the compound file format takes time during indexing (7-33% in testing for LUCENE-888). However, note that doing this will greatly increase the number of file descriptors used by indexing and by searching, so you could run out of file descriptors if mergeFactor is also large.
Re-use Document and Field instances As of Lucene 2.3 there are new setValue(...) methods that allow you to change the value of a Field. This allows you to re-use a single Field instance across many added documents, which can save substantial GC cost. It's best to create a single Document instance, then add multiple Field instances to it, but hold onto these Field instances and re-use them by changing their values for each added document. For example you might have an idField, bodyField, nameField, storedField1, etc. After the document is added, you then directly change the Field values (idField.setValue(...), etc), and then re-add your Document instance.
Note that you cannot re-use a single Field instance within a Document, and, you should not change a Field's value until the Document containing that Field has been added to the index. See Field for details.
Always add fields in the same order to your Document, when using stored fields or term vectors
Lucene's merging has an optimization whereby stored fields and term vectors can be bulk-byte-copied, but the optimization only applies if the field name -> number mapping is the same across segments. Future Lucene versions may attempt to assign the same mapping automatically (see LUCENE-1737), but until then the only way to get the same mapping is to always add the same fields in the same order to each document you index.
Re-use a single Token instance in your analyzer Analyzers often create a new Token for each term in sequence that needs to be indexed from a Field. You can save substantial GC cost by re-using a single Token instance instead.
Use the char[] API in Token instead of the String API to represent token Text
As of Lucene 2.3, a Token can represent its text as a slice into a char array, which saves the GC cost of new'ing and then reclaiming String instances. By re-using a single Token instance and using the char[] API you can avoid new'ing any objects for each term. See Token for details.
Use autoCommit=false when you open your IndexWriter
In Lucene 2.3 there are substantial optimizations for Documents that use stored fields and term vectors, to save merging of these very large index files. You should see the best gains by using autoCommit=false for a single long-running session of IndexWriter. Note however that searchers will not see any of the changes flushed by this IndexWriter until it is closed; if that is important you should stick with autoCommit=true instead or periodically close and re-open the writer.
Instead of indexing many small text fields, aggregate the text into a single "contents" field and index only that (you can still store the other fields).
Increase mergeFactor, but not too much.
Larger mergeFactors defers merging of segments until later, thus speeding up indexing because merging is a large part of indexing. However, this will slow down searching, and, you will run out of file descriptors if you make it too large. Values that are too large may even slow down indexing since merging more segments at once means much more seeking for the hard drives.
Turn off any features you are not in fact using. If you are storing fields but not using them at query time, don't store them. Likewise for term vectors. If you are indexing many fields, turning off norms for those fields may help performance.
Use a faster analyzer.
Sometimes analysis of a document takes alot of time. For example, StandardAnalyzer is quite time consuming, especially in Lucene version <= 2.2. If you can get by with a simpler analyzer, then try it.
Speed up document construction. Often the process of retrieving a document from somewhere external (database, filesystem, crawled from a Web site, etc.) is very time consuming.
Don't optimize... ever.
Use multiple threads with one IndexWriter. Modern hardware is highly concurrent (multi-core CPUs, multi-channel memory architectures, native command queuing in hard drives, etc.) so using more than one thread to add documents can give good gains overall. Even on older machines there is often still concurrency to be gained between IO and CPU. Test the number of threads to find the best performance point.
Index into separate indices then merge. If you have a very large amount of content to index then you can break your content into N "silos", index each silo on a separate machine, then use the writer.addIndexesNoOptimize to merge them all into one final index.
Run a Java profiler.
If all else fails, profile your application to figure out where the time is going. I've had success with a very simple profiler called JMP. There are many others. Often you will be pleasantly surprised to find some silly, unexpected method is taking far too much time.

### How to make searching faster

Here are some things to try to speed up the seaching speed of your Lucene application. Please see ImproveIndexingSpeed for how to speed up indexing.

Be sure you really need to speed things up. Many of the ideas here are simple to try, but others will necessarily add some complexity to your application. So be sure your searching speed is indeed too slow and the slowness is indeed within Lucene.
Make sure you are using the latest version of Lucene.
Use a local filesystem. Remote filesystems are typically quite a bit slower for searching. If the index must be remote, try to mount the remote filesystem as a "readonly" mount. In some cases this could improve performance.
Get faster hardware, especially a faster IO system. Flash-based Solid State Drives works very well for Lucene searches. As seek-times for SSD's are about 100 times faster than traditional platter-based harddrives, the usual penalty for seeking is virtually eliminated. This means that SSD-equipped machines need less RAM for file caching and that searchers require less warm-up time before they respond quickly.
Tune the OS
One tunable that stands out on Linux is swappiness (http://kerneltrap.org/node/3000), which controls how aggressively the OS will swap out RAM used by processes in favor of the IO Cache. Most Linux distros default this to a highish number (meaning, aggressive) but this can easily cause horrible search latency, especially if you are searching a large index with a low query rate. Experiment by turning swappiness down or off entirely (by setting it to 0). Windows also has a checkbox, under My Computer -> Properties -> Advanced -> Performance Settings -> Advanced -> Memory Usage, that lets you favor Programs or System Cache, that's likely doing something similar.
Open the IndexReader with readOnly=true. This makes a big difference when multiple threads are sharing the same reader, as it removes certain sources of thread contention.
On non-Windows platform, using NIOFSDirectory instead of FSDirectory.
This also removes sources of contention when accessing the underlying files. Unfortunately, due to a longstanding bug on Windows in Sun's JRE (http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=6265734 -- feel particularly free to go vote for it), NIOFSDirectory gets poor performance on Windows.
Add RAM to your hardware and/or increase the heap size for the JVM. For a large index, searching can use alot of RAM. If you don't have enough RAM or your JVM is not running with a large enough HEAP size then the JVM can hit swapping and thrashing at which point everything will run slowly.
Use one instance of IndexSearcher.
Share a single IndexSearcher across queries and across threads in your application.
When measuring performance, disregard the first query.
The first query to a searcher pays the price of initializing caches (especially when sorting by fields) and thus will skew your results (assuming you re-use the searcher for many queries). On the other hand, if you re-run the same query again and again, results won't be realistic either, because the operating system will use its cache to speed up IO operations. On Linux (kernel 2.6.16 and later) you can clean the disk cache using sync ; echo 3 > /proc/sys/vm/drop_caches. See http://linux-mm.org/Drop_Caches for details.
Re-open the IndexSearcher only when necessary.
You must re-open the IndexSearcher in order to make newly committed changes visible to searching. However, re-opening the searcher has a certain overhead (noticeable mostly with large indexes and with sorting turned on) and should thus be minimized. Consider using a so called warming technique which allows the searcher to warm up its caches before the first query hits.
Decrease mergeFactor. Smaller mergeFactors mean fewer segments and searching will be faster. However, this will slow down indexing speed, so you should test values to strike an appropriate balance for your application.
Limit usage of stored fields and term vectors. Retrieving these from the index is quite costly. Typically you should only retrieve these for the current "page" the user will see, not for all documents in the full result set. For each document retrieved, Lucene must seek to a different location in various files. Try sorting the documents you need to retrieve by docID order first.
Use FieldSelector to carefully pick which fields are loaded, and how they are loaded, when you retrieve a document.
Don't iterate over more hits than needed.
Iterating over all hits is slow for two reasons. Firstly, the search() method that returns a Hits object re-executes the search internally when you need more than 100 hits. Solution: use the search method that takes a HitCollector instead. Secondly, the hits will probably be spread over the disk so accessing them all requires much I/O activity. This cannot easily be avoided unless the index is small enough to be loaded into RAM. If you don't need the complete documents but only one (small) field you could also use the FieldCache class to cache that one field and have fast access to it.
When using fuzzy queries use a minimum prefix length.
Fuzzy queries perform CPU-intensive string comparisons - avoid comparing all unique terms with the user input by only examining terms starting with the first "N" characters. This prefix length is a property on both QueryParser and FuzzyQuery - default is zero so ALL terms are compared.
Consider using filters. It can be much more efficient to restrict results to a part of the index using a cached bit set filter rather than using a query clause. This is especially true for restrictions that match a great number of documents of a large index. Filters are typically used to restrict the results to a category but could in many cases be used to replace any query clause. One difference between using a Query and a Filter is that the Query has an impact on the score while a Filter does not.
Find the bottleneck.
Complex query analysis or heavy post-processing of results are examples of hidden bottlenecks for searches. Profiling with at tool such as VisualVM helps locating the problem.