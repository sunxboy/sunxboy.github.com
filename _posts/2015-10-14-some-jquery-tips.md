---
layout: post
title: "javascript小技巧积累"
description: "javascript小技巧积累"
category: 技术
tags: [javascript]
---
### format string (jquery)

```javascript
$.format('api/control/{0}/{1}', viewModel.Name(), control.Name())
```

### 桌面通知的实现

	// request permission on page load
	document.addEventListener('DOMContentLoaded', function () {
	  if (Notification.permission !== "granted")
		Notification.requestPermission();
	});

	function notifyMe() {
	  if (!Notification) {
		alert('Desktop notifications not available in your browser. Try Chromium.'); 
		return;
	  }

	  if (Notification.permission !== "granted")
		Notification.requestPermission();
	  else {
		var notification = new Notification('Notification title', {
		  icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
		  body: "Hey there! You've been notified!",
		});

		notification.onclick = function () {
		  window.open("http://stackoverflow.com/a/13328397/1269037");      
		};
		
	  }
	}

### 使用js 判断IE版本

```Javascript
function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
    {
        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            var ua = navigator.userAgent;
            var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat( RegExp.$1 );
        }
        return rv;
    }
    function checkVersion()
    {
        var msg = "You're not using Internet Explorer.";
        var ver = getInternetExplorerVersion();

        if ( ver > -1 )
        {
            if ( ver >= 8.0 )
                msg = "You're using a recent copy of Internet Explorer."
            else
                msg = "You should upgrade your copy of Internet Explorer.";
        }
        alert( msg );
    }
```
