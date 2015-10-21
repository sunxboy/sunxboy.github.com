---
layout: post
title: "在luci系统中增加服务"
description: "luci"
category: 技术
tags: [luci, lua]
---

Lua 是一个小巧的脚本语言。是巴西里约热内卢天主教大学（Pontifical Catholic University of Rio de Janeiro）里的一个研究小组，由Roberto Ierusalimschy、Waldemar Celes 和 Luiz Henrique de Figueiredo所组成并于1993年开发。 其设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。Lua由标准C编写而成，几乎在所有操作系统和平台上都可以编译，运行。 Lua并没有提供强大的库，这是由它的定位决定的。所以Lua不适合作为开发独立应用程序的语言。Lua 有一个同时进行的JIT项目，提供在特定平台上的即时编译功能。

官方下载地址:
<http://www.lua.org/ftp/>

## UCI系统
<http://wiki.openwrt.org/zh-cn/doc/techref/uci>
<http://wiki.openwrt.org/zh-cn/doc/uci>

### 共同原则

OpenWrt的所有配置文件皆位于/etc/config/目录下。每个文件大致与它所配置的那部分系统相关。可用文本编辑器、"uci" 命令行实用程序或各种编程API(比如 Shell, Lua and C)来编辑/修改这些配置文件。

### 配置文件

| 文件位置 | 描述 |
|:----------|:---------|
| /etc/config/dhcp         | dnsmasq和DHCP的配置   |
|----
| **基本配置**             |                 |
| /etc/config/dropbear     |  SSH服务端选项   |
| /etc/config/firewall     |  中央防火墙配置 |
| /etc/config/network      |  交换，接口和路由配置 |
| /etc/config/system       |  杂项与系统配置 |
| /etc/config/timeserver   |  rdate的时间服务器列表 |
| /etc/config/wireless     |  无线设置和无线网络的定义 |
|----
| **IPv6**             |                 |
| /etc/config/ahcpd    | Ad-Hoc配置协议(AHCP) 服务端配置以及转发器配置
| /etc/config/aiccu    | AICCU 客户端配置
| /etc/config/dhcp6c   | WIDE-DHCPv6 客户端配置
| /etc/config/dhcp6s   | WIDE-DHCPv6 服务端配置
| /etc/config/gw6c     | GW6c 客户端配置
| /etc/config/radvd    | 路由通告 (radvd) 配置
|----
| **其他**  |      |
| /etc/config/etherwake | 以太网唤醒: etherwake |
| /etc/config/fstab | 挂载点及swap |
| /etc/config/hd-idle | 另一个可选的硬盘空闲休眠进程(需要路由器支持usb硬盘) |
| /etc/config/httpd | 网页服务器配置选项(Busybox 自带httpd, 已被舍弃) |
| /etc/config/luci | 基础 LuCI 配置 |
| /etc/config/luci_statistics | 包统计配置 |
| /etc/config/mini_snmpd | mini_snmpd 配置 |
| /etc/config/mountd | OpenWrt 自动挂载进程(类似autofs) |
| /etc/config/multiwan | 简单多WAN出口配置 |
| /etc/config/ntpclient | ntp客户端配置，用以获取正确时间 |
| /etc/config/pure-ftpd | Pure-FTPd 服务端配置 |
| /etc/config/qos | QoS配置(流量限制与整形) |
| /etc/config/samba | samba配置(Microsoft文件共享) |
| /etc/config/snmpd | SNMPd(snmp服务进程) 配置 |
| /etc/config/sshtunnel | sshtunnel配置 |
| /etc/config/stund | STUN 服务端配置 |
| /etc/config/transmission | BitTorrent配置 |
| /etc/config/uhttpd | Web服务器配置(uHTTPd) |
| /etc/config/upnpd | miniupnpd UPnP服务器配置 |
| /etc/config/ushare | uShare UPnP 服务器配置 |
| /etc/config/vblade | vblade 用户空间AOE(ATA over Ethernet)配置 |
| /etc/config/vnstat | vnstat 下载器配置 |
| /etc/config/wifitoogle | 使用按钮来开关WiFi的脚本 |
| /etc/config/wol | Wake-on-Lan: wol |
| /etc/config/znc | ZNC 配置 |
|=====
{: rules="groups"}




### 添加一个服务
```
module("luci.controller.控制器名", package.seeall)

function index()
        entry(路径, 调用目标, _("显示名称"), 显示顺序)
        end
```

`调用目标`，比如写为“cbi("myapp/mymodule")”, 就可以调用`/usr/lib/lua/luci/model/cbi/myapp/mymodule.lua`文件

**/usr/lib/lua/luci/controller/modbus.lua**

```
-- Copyright 2008 Steven Barth <steven@midlink.org>
-- Licensed to the public under the Apache License 2.0.

module("luci.controller.modbus", package.seeall)

function index()
        if not nixio.fs.access("/etc/config/modbus") then
                return
        end

        local page

        page = entry({"admin", "modbus"}, cbi("modbus/modbus"), _("Modbus"))
        page.dependent = true
end
```

### 需要映射与存储文件的关系

比如: `m = Map("配置文件文件名", "配置页面标题", "配置页面说明")`

**/usr/lib/lua/luci/model/cbi/modbus/modbus.lua**

```
-- Copyright 2015 Beam Sun <sunxboy@foxmail.com>
-- Licensed to the public under the Apache License 2.0.

local wa = require "luci.tools.webadmin" 
local fs = require "nixio.fs"

m = Map("modbus", translate("Modbus communication from EIFESUN"),
        translate("Setting modbus parameter for device monitoring, include schedule a modbus job, web server configuration and modbus communication more detail parameters"))


function m.on_after_commit(self)

   for i, config in ipairs(self.parsechain) do
                               -- self.uci:commit(config)

   luci.sys.call("/tmp/test.sh" .. "config" .. " >/dev/null")
                               -- Refresh data because commit changes section names
                               -- self.uci:load(config)
   end


   luci.sys.call("/etc/init.d/modbus restart 1\>/dev/null 2\>/dev/null")
end



s = m:section(TypedSection, "webserver", translate("Web Server"))
s.addremove = false
s.anonymous = true
wh = s:option(Value, "host", translate("Web host"), translate("Send modbus data to which web server host"))
wp = s:option(Value, "port", translate("Web port"), translate("Send modbus data to which web server througth the port"))


--function wh.write(self, section, value)
--luci.sys.call("env -i echo webhost changed ====== >/dev/null")
--end

s = m:section(TypedSection, "communication", translate("Modbus communication parameters"))
s.template = "cbi/modbus_section"
s.anonymous = true
s.addremove = true
s.sortable  = false

slaveid = s:option(Value, "slaveid", translate("Slave Id"))
slaveid.width = 70

modbush = s:option(Value, "modbushost", translate("Modbus Host"))               
modbush.rmempty = true                                                       
wa.cbi_add_knownips(modbush)   


ports = s:option(Value, "modbusport", translate("Modbus Port"))                      
ports.rmempty = true                                                  
ports.width = 50

modbusd = s:option(ListValue, "device", translate("Modbus Device"))
modbusd:value(11, translate("Weather"))
modbusd:value(21, translate("Inv5kw"))
modbusd:value(22, translate("Inv20kw"))
modbusd:value(23, translate("Inv500kw"))
modbusd.rmempty = true

functioncode = s:option(Value, "function", translate("Function Code"))                                                                                       
functioncode.width = 90  

start = s:option(Value, "startaddress", translate("Start address"))
start.width = 60

quantity = s:option(Value, "quantity", translate("Quantity"))
quantity.width = 50
comment = s:option(Value, "comment", translate("Comment"))   

return m
```

### 配置文件

**/etc/config/modbus**

```
config webserver 'web'
        option host '123.57.151.8'
        option port '9876'

config class 'device'
        option weather '11'
        option inv5kw '21'
        option inv20kw '22'
        option inv500kw '23'

config communication
        option slaveid '3'
        option modbushost '192.168.1.142'
        option modbusport '50000'
        option device '21'
        option function '4'
        option startaddress '0'
        option quantity '27'
        option comment 'inverter1'
```

### 配置页面文件

**/usr/lib/lua/luci/view/cbi/modbus_section.htm**

```
<%-
local rowcnt = 1
function rowstyle()
	rowcnt = rowcnt + 1
	return (rowcnt % 2) + 1
end

function width(o)
	if o.width then
		if type(o.width) == 'number' then
			return ' style="width:%dpx"' % o.width
		end
		return ' style="width:%s"' % o.width
	end
	return ''
end
-%>

<!-- modbus section -->
<fieldset class="cbi-section" id="cbi-<%=self.config%>-<%=self.sectiontype%>">
	<% if self.title and #self.title > 0 then -%>
		<legend><%=self.title%></legend>
	<%- end %>
	<%- if self.sortable then -%>
		<input type="hidden" id="cbi.sts.<%=self.config%>.<%=self.sectiontype%>" name="cbi.sts.<%=self.config%>.<%=self.sectiontype%>" value="" />
	<%- end -%>
	<div class="cbi-section-descr"><%=self.description%></div>
	<div class="cbi-section-node">
		<%- local count = 0 -%>
		<table class="cbi-section-table">
			<tr class="cbi-section-table-titles">
			<%- if not self.anonymous then -%>
				<%- if self.sectionhead then -%>
					<th class="cbi-section-table-cell"><%=self.sectionhead%></th>
				<%- else -%>
					<th>&#160;</th>
				<%- end -%>
			<%- end -%>
			<%- for i, k in pairs(self.children) do if not k.optional then -%>
				<th class="cbi-section-table-cell"<%=width(k)%>>
				<%- if k.titleref then -%><a title="<%=self.titledesc or translate('Go to relevant configuration page')%>" class="cbi-title-ref" href="<%=k.titleref%>"><%- end -%>
					<%-=k.title-%>
				<%- if k.titleref then -%></a><%- end -%>
				</th>
			<%- count = count + 1; end; end; if self.sortable then -%>
				<th class="cbi-section-table-cell"><%:Sort%></th>
			<%- end; if self.extedit or self.addremove then -%>
				<th class="cbi-section-table-cell">&#160;</th>
			<%- count = count + 1; end -%>
			</tr>
			<tr class="cbi-section-table-descr">
			<%- if not self.anonymous then -%>
				<%- if self.sectiondesc then -%>
					<th class="cbi-section-table-cell"><%=self.sectiondesc%></th>
				<%- else -%>
					<th></th>
				<%- end -%>
			<%- end -%>
			<%- for i, k in pairs(self.children) do if not k.optional then -%>
				<th class="cbi-section-table-cell"<%=width(k)%>><%=k.description%></th>
			<%- end; end; if self.sortable then -%>
				<th class="cbi-section-table-cell"></th>
			<%- end; if self.extedit or self.addremove then -%>
				<th class="cbi-section-table-cell"></th>
			<%- end -%>
			</tr>
			<%- local isempty = true
			    for i, k in ipairs(self:cfgsections()) do
					section = k
					isempty = false
					scope = { valueheader = "cbi/cell_valueheader", valuefooter = "cbi/cell_valuefooter" }
			-%>
			<tr class="cbi-section-table-row<% if self.extedit or self.rowcolors then %> cbi-rowstyle-<%=rowstyle()%><% end %>" id="cbi-<%=self.config%>-<%=section%>">
				<% if not self.anonymous then -%>
					<th><h3><%=(type(self.sectiontitle) == "function") and self:sectiontitle(section) or k%></h3></th>
				<%- end %>


				<%-
					for k, node in ipairs(self.children) do
						if not node.optional then
							node:render(section, scope or {})
						end
					end
				-%>

				<%- if self.sortable then -%>
					<td class="cbi-section-table-cell">
						<input class="cbi-button cbi-button-up" type="button" value=""  onclick="return cbi_row_swap(this, true, 'cbi.sts.<%=self.config%>.<%=self.sectiontype%>')" alt="<%:Move up%>" title="<%:Move up%>" />
						<input class="cbi-button cbi-button-down" type="button" value=""  onclick="return cbi_row_swap(this, false, 'cbi.sts.<%=self.config%>.<%=self.sectiontype%>')" alt="<%:Move down%>" title="<%:Move down%>" />
					</td>
				<%- end -%>

				<%- if self.extedit or self.addremove then -%>
					<td class="cbi-section-table-cell">
						<%- if self.extedit then -%>
							<input class="cbi-button cbi-button-edit" type="button" value="<%:Edit%>"
							<%- if type(self.extedit) == "string" then
							%> onclick="location.href='<%=self.extedit:format(section)%>'"
							<%- elseif type(self.extedit) == "function" then
							%> onclick="location.href='<%=self:extedit(section)%>'"
							<%- end 
							%> alt="<%:Edit%>" title="<%:Edit%>" />
						<%- end; if self.addremove then %>
							<input class="cbi-button cbi-button-remove" type="submit" value="<%:Delete%>"  onclick="this.form.cbi_state='del-section'; return true" name="cbi.rts.<%=self.config%>.<%=k%>" alt="<%:Delete%>" title="<%:Delete%>" />
						<%- end -%>
					</td>
				<%- end -%>
			</tr>
			<%- end -%>

			<%- if isempty then -%>
			<tr class="cbi-section-table-row">
				<td colspan="<%=count%>"><em><br /><%:This section contains no values yet%></em></td>
			</tr>
			<%- end -%>
		</table>

		<% if self.error then %>
			<div class="cbi-section-error">
				<ul><% for _, c in pairs(self.error) do for _, e in ipairs(c) do -%>
					<li><%=pcdata(e):gsub("\n","<br />")%></li>
				<%- end end %></ul>
			</div>
		<% end %>

		<%- if self.addremove then -%>
			<% if self.template_addremove then include(self.template_addremove) else -%>
			<div class="cbi-section-create cbi-tblsection-create">
				<% if self.anonymous then %>
					<input class="cbi-button cbi-button-add" type="submit" value="<%:Add%>" name="cbi.cts.<%=self.config%>.<%=self.sectiontype%>.<%=section%>" title="<%:Add%>" />
				<% else %>
					<% if self.invalid_cts then -%><div class="cbi-section-error"><% end %>
					<input type="text" class="cbi-section-create-name" id="cbi.cts.<%=self.config%>.<%=self.sectiontype%>.<%=section%>" name="cbi.cts.<%=self.config%>.<%=self.sectiontype%>.<%=section%>" />
					<script type="text/javascript">cbi_validate_field('cbi.cts.<%=self.config%>.<%=self.sectiontype%>.<%=section%>', true, 'uciname');</script>
					<input class="cbi-button cbi-button-add" type="submit" onclick="this.form.cbi_state='add-section'; return true" value="<%:Add%>" title="<%:Add%>" />
					<% if self.invalid_cts then -%>
						<br /><%:Invalid%></div>
					<%- end %>
				<% end %>
			</div>
			<%- end %>
		<%- end -%>
	</div>
</fieldset>
<!-- /modbus section -->
```

### 初始化服务以及开启关闭服务

**/etc/init.d/modbus**

```
#!/bin/sh /etc/rc.common
# Copyright (C) 2006 OpenWrt.org

START=50
USE_PROCD=1
MODBUSFILE="/overlay/modbus/CoreHome/src/test.ln/properties/modbus/modbus-group-config.properties"
MODBUSGROUPFILE="/overlay/modbus/CoreHome/src/test.ln/properties/modbus/modbus.group1.properties"
WEBFILE="/overlay/modbus/CoreHome/src/test.ln/properties/modbus/web.config.properties"

COMMUNICATION_COUNT=0
FIELD_WEB_HOST="web.server.host"
FIELD_WEB_PORT="web.server.port"

temp_file=/tmp/tempfile.$$

validate_modbus_webserver() {

        uci_validate_section modbus webserver "${1}" \ 
                'host:ipaddr' \
                'port:or(port, portrange)'    
                                   
        return $?
}

validate_modbus_communication() {

        uci_validate_section modbus communication "${1}" \ 
                'slaveid:uinteger' \
                'modbushost:ipaddr' \
                'modbusport:or(port, portrange)' \
                'startaddress:uinteger' \
                'quantity:uinteger' \
                'device:or("11","21","22","23")' \
                'comment:string' \
                'function:uinteger'    
                                   
        return $?
}

xappend() {
	local value="$1"

	echo "${value#--}" >> $temp_file
}

print_title() {
       xappend "--#####################################"
       echo "#            ${1}              #" >> $temp_file
       xappend "--#####################################"
}

update_field() {
   local field="$1"
   local value="$2"
   local file="$3"
   
   sed -i 's:^[ \t]*'$field'[ \t]*=\([ \t]*.*\)$:'$field'='$value':' $file
}

update_webhost() {
    sed -i 's:^[ \t]*web.server.host[ \t]*=\([ \t]*.*\)$:web.server.host='$1':' $WEBFILE
}

update_webport() {
    sed -i 's:^[ \t]*web.server.port[ \t]*=\([ \t]*.*\)$:web.server.port='$1':' $WEBFILE
}

update_modbus_group() {

   if [ $COMMUNICATION_COUNT -gt 1 ]; then

       sed -i '/^[ \t]*modbus.group.group1.names[ \t]*=/ s/$/, '$1'/' $MODBUSFILE

   else 

       sed -i 's:^[ \t]*modbus.group.group1.names[ \t]*=\([ \t]*.*\)$:modbus.group.group1.names='$1':' $MODBUSFILE

   fi

}

reset_communication_count() {
   COMMUNICATION_COUNT=0
}

trigger_communication_count() {
  let COMMUNICATION_COUNT=COMMUNICATION_COUNT+1
}


handle_communication() {
    local config="$1"

    trigger_communication_count
    
    local name="inverter${COMMUNICATION_COUNT}"
    update_modbus_group $name

    print_title $name
    xappend "modbus.${name}.type=inverter"    

    config_get function "$config" function
    xappend "modbus.${name}.functionCode=$function"
 
    config_get modbushost "$config" modbushost
    xappend "modbus.${name}.host=$modbushost"

    config_get modbusport "$config" modbusport
    xappend "modbus.${name}.port=$modbusport"

    config_get device "$config" device
    xappend "modbus.${name}.transactionId=$device"

    config_get startaddress "$config" startaddress
    xappend "modbus.${name}.block${function}.startaddress=${startaddress}"

    config_get quantity "$config" quantity
    xappend "modbus.${name}.block${function}.quantity=${quantity}"

    config_get slaveid "$config" slaveid                                                                          
    xappend "modbus.${name}.block${function}.unitId=${slaveid}"

    xappend ""

}

service_triggers() {

        reset_communication_count

	procd_add_validation validate_modbus_webserver validate_modbus_communication

        config_load modbus


	config_get webhost web host
        update_field $FIELD_WEB_HOST $webhost $WEBFILE
	
	config_get webport web port
        update_field $FIELD_WEB_PORT $webport $WEBFILE


        config_foreach handle_communication communication
        mv $temp_file $MODBUSGROUPFILE

	procd_add_reload_trigger modbus

        logger "modbus reloaded !! ======================"
}


start_service() {
       modbus_run
}

reload_service() {
       modbus_stop
       modbus_run
}

stop_service() {
       modbus_stop
}

modbus_run() {
       jamvm -Xmx80m -jar /overlay/modbus/mips-modbus.jar com.sunxboy.platform.application.ApplicationLauncher --core:appId mipsApp --core:instanceId router --core:home /overlay/modbus/CoreHome/src &
}

modbus_stop() {
       kill -9 $(ps w | grep '[j]amvm' | awk '{print $1}')
}
```