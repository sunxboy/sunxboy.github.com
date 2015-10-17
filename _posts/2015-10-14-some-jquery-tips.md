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
