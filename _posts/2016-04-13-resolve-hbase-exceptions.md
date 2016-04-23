---
layout: post
title: "hbase 异常解决"
description: "hbase 异常解决"
category: 技术
tags: [hbase]
---

### Found lingering reference异常

* 第一种解决：

```
hbase hbck -fixReferenceFiles  month_hotstatic
```

* 另一种方法：<http://stackoverflow.com/questions/17810443/error-found-inconsistency-in-table-hbase>

<div class="alert alert-warning">
		This looks like you had a failed region split, see [HBASE-8052] (https://issues.apache.org/jira/browse/HBASE-8502) for more details.

This bug leaves references to parent regions that have been moved in HDFS. To fix, just delete the reference files listed in the HBCK output e.g. hadoop fs -rm hdfs://master:8020/hbase/LogTable/f41ff2fae25d1dab3f16306f4f995369/l/d9c7d33257ae406caf8d94277ff6d247.fbda7904cd1f0ac9583e04029a138487.
Once the bad references are gone the region should be assigned automatically. You may have to do the assignment from the shell, in my experience though it only takes a minute or two for the region to get reassigned. Then run hbase hbck -fix again to confirm there are no other inconsistencies.
</div>

```
 hbase hbck > 1.log 2>&1
 cat 1.log | grep -i "ERROR" 
 
 cat 1.log | grep -i "ERROR" | awk -F"ERROR: Found lingering reference file " '{print $2}' >a.txt

#!/bin/sh


while read line
do
        hadoop fs -rmr $line

done < a.txt
```

### 异常问题解决

```
hadoop fsck
hbase hbck -fix
```