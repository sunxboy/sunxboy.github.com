---
layout: post
title: "Spring 中 cache 的使用"
description: "Spring 中 cache 的使用"
category: 技术
tags: [cache]
---


### 配置
默认使用proxy模式，即cacheable方法，只能通过外部接口调用才会生效，
如果要支持class内自已调用，请使用`ASPECTJ`模式

```
@EnableCaching
public class AppConfig {

    @Bean
    public CacheManager cacheManager() {
        return new GuavaCacheManager("history", "total", "case_tracking", "global_tracking");
    }
}
```

### 缓存的方法声明

```
@Cacheable(value = "total", key = "#type.value+#date")
    public long getTotalCountsBefore(ReportType type, LocalDate date) {
}
```

### 清空缓存的方法声明

```
@CacheEvict(value = "total", key = "#type.value+#date")
    public void saveTotalHistoryData(ReportType type, LocalDate date, Long count) {
}
```

