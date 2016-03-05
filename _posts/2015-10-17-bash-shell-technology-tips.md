---
layout: post
title: "Bash Shell 技巧点滴"
description: "Bash Shell"
category: 技术
tags: [bash, shell]
---

使用Linux shell是我每天的基本工作，但我经常会忘记一些有用的shell命令和l技巧, 当然，有些命令我能记住，但我不敢说能记得如何用它执行某个特定任务。

<div class="alert alert-warning">
需要注意一点的是，有些用法需要在你的Linux系统里安装额外的软件。
</div>

### 从文件夹中找到含有某一字符的文件

	grep -R "toUppercase()" *

### 从文件夹中找文件名中含有某一字符的文件

	find . -name "autom4te.in"

### 查看某一文件夹所占空间大小

	du -sh barrier_packages/

### 查看磁盘空间占用情况

	df -h

### 关闭端口

	iptables -A INPUT -p tcp --dport 111 -j DROP

### 打开端口

	iptables -A INPUT -p tcp --dport 111 -j ACCEPT

### 查看linux系统目前正使用（监听）的端口：
```
netstat -tunpl
netstat -lntu
-l = only services which are listening on some port
-n = show port number, don't try to resolve the service name
-t = tcp ports
-u = udp ports
-p = name of the program
```

### 检查linux 系统发行版本

	uname -a
	uname -mrs

### 写全局变量：

	echo "export PATH=/usr/share/java/bin:\$PATH" >> /etc/profile

### 查看CPU的内核架构：

	lscpu

或

	less /proc/cpuinfo

### 查询端口详细信息：

	ifconfig

### Jamvm的代码调试功能
```
jamvm -verbose[:class|gc|jni]
   :class print out information about class loading, etc.
   :gc print out results of garbage collection
   :jni print out native method dynamic resolution
```

### 查看资源消耗前10的进程

	ps aux|head -1;ps aux|grep -v PID|sort -rn -k +3|head

STAT: 该行程的状态，linux的进程有5种状态：

+ D 不可中断 uninterruptible sleep (usually IO)
+ R 运行 runnable (on run queue)
+ S 中断 sleeping
+ T 停止 traced or stopped
+ Z 僵死 a defunct (”zombie”) process

注: 其它状态还包括W(`无驻留页`), <(`高优先级进程`), N(`低优先级进程`), L(`内存锁页`).
 
+ START: 行程开始时间
+ TIME: 执行的时间
+ COMMAND:所执行的指令

### 检查远程端口是否对bash开放：
```
echo >/dev/tcp/8.8.8.8/53 && echo "open"
```

### 让进程转入后台：
```
Ctrl + z
```

### 将进程转到前台：
```
fg
```

### 查找合适版本的某个软件
```
apt-cache --names-only search xxxx
```

### 产生随机的十六进制数，其中n是字符数
```
openssl rand -hex n
```

### 在当前shell里执行一个文件里的命令
```
source /home/user/file.name
```

### 截取前5个字符
```
${variable:0:5}
```

### SSH debug 模式
```
ssh -vvv user@ip_address
```

### SSH with pem key
```
ssh user@ip_address -i key.pem
```

### 用wget抓取完整的网站目录结构，存放到本地目录中
```
wget -r --no-parent --reject "index.html*" http://hostname/ -P /home/user/dirs
```

### 一次创建多个目录
```
mkdir -p /home/user/{test,test1,test2}
```

### 列出包括子进程的进程树
```
ps axwef
```

### 创建 war 文件
```
jar -cvf name.war file
```

### 测试硬盘写入速度
```
dd if=/dev/zero of=/tmp/output.img bs=8k count=256k; rm -rf /tmp/output.img
```

### 测试硬盘读取速度
```
hdparm -Tt /dev/sda
```

### 获取文本的md5 hash
```
echo -n "text" | md5sum
```

### 检查xml格式
```
xmllint --noout file.xml
```

### 将tar.gz提取到新目录里
```
tar zxvf package.tar.gz -C new_dir
```

### 使用curl获取HTTP头信息
```
curl -I http://www.example.com
```

### 修改文件或目录的时间戳(YYMMDDhhmm)
```
touch -t 0712250000 file
```

### 用wget命令执行ftp下载
```
wget -m ftp://username:password@hostname
```

### 生成随机密码(例子里是16个字符长)
```
LANG=c < /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-16};echo;
```

### 快速备份一个文件
```
cp some_file_name{,.bkp}
```

### 访问Windows共享目录
```
smbclient -U "DOMAIN\user" //dc.domain.com/share/test/dir
```

### 执行历史记录里的命令(这里是第100行)
```
!100
```

### 解压
```
unzip package_name.zip -d dir_name
```

### 输入多行文字(CTRL + d 退出)
```
cat > test.txt
```

### 创建空文件或清空一个现有文件
```
> test.txt
```

### 与Ubuntu NTP server同步时间
```
ntpdate ntp.ubuntu.com
```

### 用netstat显示所有tcp4监听端口
```
netstat -lnt4 | awk '{print $4}' | cut -f2 -d: | grep -o '[0-9]*'
```

### qcow2镜像文件转换
```
qemu-img convert -f qcow2 -O raw precise-server-cloudimg-amd64-disk1.img \
                                 precise-server-cloudimg-amd64-disk1.raw
```

### 重复运行文件，显示其输出（缺省是2秒一次）
```
watch ps -ef
```

### 所有用户列表
```
getent passwd
```

### 挂载磁盘（读写模式） 
```
mount -o remount,rw /
```

### 挂载光盘到指定目录
```
mount -o loop /dev/sr0 /mnt
mount -r -t auto /dev/sr0 /mnt
```

### 挂载一个目录（这是不能使用链接的情况）
```
mount --bind /source /destination
```

### 使用挂载目录创建yum本地库
```
mount -o loop /path/to/iso /mnt
vi /etc/yum.repos.d/centosdvdiso.repo
```
>[centosdvdiso]
name=CentOS DVD ISO
baseurl=file:///mnt
enabled=1
gpgcheck=0
gpgkey=file:///mnt/RPM-GPG-KEY-CentOS-6

### 动态更新DNS server
```
nsupdate < <EOF
update add $HOST 86400 A $IP
send
EOF
```

### 递归grep所有目录
```
grep -r "some_text" /path/to/dir
```

### grep递归查询目录下指定文件后缀内容
```
grep -R --include="*.txt" "foo" ~/projects/
```

### 列出前10个最大的文件
```
lsof / | awk '{ if($7 > 1048576) print $7/1048576 "MB "$9 }' | sort -n -u | tail
```

### 显示剩余内存(MB)
```
free -m | grep cache | awk '/[0-9]/{ print $4" MB" }'
```

### 打开Vim并跳到文件末
```
vim + some_file_name
```

### 打印历史记录中最后一次cat命令
```
!cat:p
```

### 运行历史记录里最后一次cat命令：
```
!cat
```

### 找出/home/user下所有空子目录
```
find /home/user -maxdepth 1 -type d -empty
```

### 获取test.txt文件中第50-60行内容
```
< test.txt sed -n '50,60p'
```

### 运行最后一个命令

<div class="alert alert-warning">
如果最后一个命令是mkdir /root/test, 下面将会运行: sudo mkdir /root/test
</div>

```
sudo !!
```

### 创建临时RAM文件系统 – ramdisk (先创建/tmpram目录)
```
mount -t tmpfs tmpfs /tmpram -o size=512m
Grep whole words:

grep -w "name" test.txt
```

### 在需要提升权限的情况下往一个文件里追加文本
```
echo "some text" | sudo tee -a /path/file
```

### 列出所有kill signal参数
```
kill -l
```

### 在bash历史记录里禁止记录最后一次会话
```
kill -9 $$
```

### 扫描网络寻找开放的端口
```
nmap -p 8081 172.20.0.0/16
```

### 设置git email
```
git config --global user.email "me@example.com"
To sync with master if you have unpublished commits:

git pull --rebase origin master
```

### 将所有文件名中含有”txt”的文件移入/home/user目录
```
find -iname "*txt*" -exec mv -v {} /home/user \;
```

### 将文件按行并列显示
```
paste test.txt test1.txt
```

### shell里的进度条
```
pv data.log
```

### 使用netcat将数据发送到Graphite server
```
echo "hosts.sampleHost 10 `date +%s`" | nc 192.168.200.2 3000
```

### 将tabs转换成空格
```
expand test.txt > test1.txt
Skip bash history:

< space >cmd
```

### 去之前的工作目录
```
cd -
```

### 拆分大体积的tar.gz文件(每个100MB)，然后合并回去：
```
split –b 100m /path/to/large/archive /path/to/output/files
cat files* > archive
```

### 使用curl获取HTTP status code
```
curl -sL -w "%{http_code}\\n" www.example.com -o /dev/null
```

### 设置root密码，强化MySQL安全安装
```
/usr/bin/mysql_secure_installation
```

### 当Ctrl + c不好使时
```
Ctrl + \
```

### 获取文件owner
```
stat -c %U file.txt
```

### block设备列表
```
lsblk -f
```

### 找出文件名结尾有空格的文件
```
find . -type f -exec egrep -l " +$" {} \;
```

### 找出文件名有tab缩进符的文件
```
find . -type f -exec egrep -l $'\t' {} \;
```

### 用”=”打印出横线
```
printf '%100s\n' | tr ' ' =
```

### 查看IP 地址
```
ifconfig
```

### 更新jar包中的文件
```
jar vfu /d/dev/xxx.jar org/apache/hadoop/hbase/filter/
```

### scp的使用
```
scp local_file remote_user@host:remote_folder
```

### sqlplus的使用
```
sqlplus user/pass@local_SID
```

### sqlplus下执行SQL
```
sqlplus> @path.sql
```

### chown赋权文件的所有者
```
chown hadoop:hadoop datafolder
```

### 关闭linux防火墙
```
systemctl stop firewalld
systemctl disable firewalld
```

### 手动修改linux系统时间
```
datetimectl
datetimectl set-time 2015-11-13
datetimectl set-time 14:15:30
```

### linux下json parser工具
<https://stedolan.github.io/jq/>

### bash shell 写文件
```
cat << EOF > /tmp/yourfilehere
These contents will be written to the file.
        This line is indented.
EOF
```