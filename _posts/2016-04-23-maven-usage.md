---
layout: post
title: "maven 用法"
description: "maven 用法"
category: 技术
tags: [maven]
---

### install jar into local repostory

```
mvn install:install-file -Dfile=classes12_g.jar -DgroupId=com.oracle \
-DartifactId=oracle -Dversion=10.2.0.2.0 -Dpackaging=jar -DgeneratePom=true
```

### 自动上传本地jar到maven 远程库

* 基本命令

```
mvn deploy:deploy-file \
    -Durl=http://192.168.0.152:8081/nexus/content/repositories/thirdparty/ \
    -DrepositoryId=Nexus \
    -DgroupId=com.oracle \
    -DartifactId=ojdbc6 \
    -Dversion=11.2.0.1.0  \
    -Dpackaging=jar \
    -Dfile=ojdbc6-11.2.0.1.0.jar
```

* 注意查看各种repostory的配置中“部署策略”是否为允许

![xxxxxx]({{ site.qiniu_url }}/maven/maven_upload.jpg)



### Maven 中添加profile并对属性文件进行操作

```
<profiles>
      <profile>
      <id>prod</id>
      <build>
      <plugins>
         <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-antrun-plugin</artifactId>
            <version>1.8</version>
            <executions>
               <execution>
                  <phase>compile</phase>
                  <goals>
                     <goal>run</goal>
                  </goals>
                  <configuration>
                  <tasks>
                     <echo>Using prod env properties</echo>
            		 <copy file="src/main/resources/prod/primary_db.properties" tofile="${project.build.outputDirectory}/primary_db.properties" overwrite="true"/>
            		 <copy file="src/main/resources/prod/badcase_db.properties" tofile="${project.build.outputDirectory}/badcase_db.properties" overwrite="true"/>
                  </tasks>
                  </configuration>
               </execution>
            </executions>
         </plugin>
      </plugins>
      </build>
      </profile>
   </profiles>
```

### tomcat maven plugin 热部署
 
```
<plugins>
	<plugin>
		<groupId>org.apache.tomcat.maven</groupId>
		<artifactId>tomcat7-maven-plugin</artifactId>
		<version>2.2</version>
		<configuration>
			<path>/myapp</path>
			<contextReloadable>true</contextReloadable>
		</configuration>
	</plugin>
</plugins>
```