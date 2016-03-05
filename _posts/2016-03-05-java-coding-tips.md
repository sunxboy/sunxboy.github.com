---
layout: post
title: "java写代码的一些小技巧"
description: "java 技巧"
category: 技术
tags: [java]
---

### 罗列并过滤目录下特定文件名
```
File dir = new File("/path/to/pdfs");
    File[] files = dir.listFiles(new FilenameFilter() {
        @Override
        public boolean accept(File dir, String name) {
            return name.matches("Comp_20120619_[^_]*_2_632128_FC_A_8_23903.pdf");
        }
    });
```

### 遍历文件夹，寻找指定文件
```
Iterator<File> stationFiles = FileUtils.iterateFiles(distributionFolder.getFile(),
                new WildcardFileFilter("*station.properties"),
                TrueFileFilter.INSTANCE);
```

### Spring下注入Resource
```
import org.springframework.core.io.Resource;

@Value("classpath:<path to file>")
private Resource cert;
```

```
@Value("${some.property}")
private Resource sqlFile;
```
![spring resource]({{ site.qiniu_url }}/spring_resource.png)

### 用JSch实现FTP功能和bufferedstream用法
```
try {
	JSch jsch = new JSch();
	session = jsch.getSession(SFTPUSER, SFTPHOST, SFTPPORT);
	session.setPassword(SFTPPASS);
	java.util.Properties config = new java.util.Properties();
	config.put("StrictHostKeyChecking", "no");
	session.setConfig(config);
	session.connect();
	channel = session.openChannel("sftp");
	channel.connect();
	channelSftp = (ChannelSftp) channel;
	channelSftp.cd(SFTPWORKINGDIR);
	byte[] buffer = new byte[1024];
	BufferedInputStream bis = new BufferedInputStream(channelSftp.get("Test.java"));
	File newFile = new File("C:/Test.java");
	OutputStream os = new FileOutputStream(newFile);
	BufferedOutputStream bos = new BufferedOutputStream(os);
	int readCount;
	// System.out.println("Getting: " + theLine);
	while ((readCount = bis.read(buffer)) > 0) {
		System.out.println("Writing: ");
		bos.write(buffer, 0, readCount);
	}
	bis.close();
	bos.close();
} catch (Exception ex) {
	ex.printStackTrace();
}
```

### Spring MVC 单元测试
```
@ContextConfiguration(locations = {"classpath:/spring/test-webapp-config.xml"})
@WebAppConfiguration
public class StationControllerTest extends AbstractJUnit4SpringContextTests
{
    public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(),
        MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));
        
    @Mock
    private StationService stationServiceMock;
    
    @Autowired
    private WebApplicationContext wac;
    
    private MockMvc mockMvc;
    
    @Before
    public void setup()
    {
        // Process mock annotations
        MockitoAnnotations.initMocks(this);
        
        // Setup Spring test in standalone mode
        this.mockMvc = webAppContextSetup(this.wac).build();
        //standaloneSetup(stationController).build();
    }
    
    @Test
    public void findAll_ShouldAddStationEntriesToModelAndRenderStationListView()
        throws Exception
    {
        // given
        Station station = new Station();
        station.setId("wz");
        station.setStationName("wenzhou");
        station.setFtpIp("192.168.0.19");
        station.setFtpPort(22);
        station.setFtpUser("hadoop");
        station.setFtpPwd("hadoop");
        station.setSshIp("192.168.0.113");
        station.setSshPort(21);
        station.setSshUser("hadoop");
        station.setSshPwd("hadoop");
        
        // when
        when(stationServiceMock.getAllStations()).thenReturn(Arrays.asList(station));
        
        // then
        
        //@formatter:off
        mockMvc.perform(get("/stations/stationlist.json"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(APPLICATION_JSON_UTF8));
        //.andExpect(jsonPath("$", hasSize(1)));
        //@formatter:on
        
        verify(stationServiceMock, times(1)).getAllStations();
        verifyNoMoreInteractions(stationServiceMock);
    }
}
```

### Spring初始化 Map in bean xml
```
<bean id="launcherContext" class="com.pip.launcher.impl.LauncherContext">
	<constructor-arg>
		<util:map>
		  <entry key="#{T(com.pip.common.model.enumfactory.ServerType).Account}" value="${Account}" />
		  <entry key="#{T(com.pip.common.model.enumfactory.ServerType).Data}" value="${Data}" />
		  <entry key="#{T(com.pip.common.model.enumfactory.ServerType).Upload}" value="${Upload}" />
		  <entry key="#{T(com.pip.common.model.enumfactory.ServerType).Collect}" value="${Collect}" />
		  <entry key="#{T(com.pip.common.model.enumfactory.ServerType).Fence}" value="${Fence}" />
		  <entry key="#{T(com.pip.common.model.enumfactory.ServerType).Collision}" value="${Collision}" />
		  <entry key="#{T(com.pip.common.model.enumfactory.ServerType).Call}" value="${Call}" />
		  <entry key="#{T(com.pip.common.model.enumfactory.ServerType).Web}" value="${Web}" />
		</util:map>
	</constructor-arg>
</bean>
```