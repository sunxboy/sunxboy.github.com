---
layout: page
title: 
tagline: Supporting tagline
---
{% include JB/setup %}

{% for post in site.posts limit:7 %}
   <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
   <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
   {{ post.content | split:'<!--break-->' | first }}
   {% if post.content contains '<!--break-->' %}
<a href="{{ post.url }}">详细阅读>>></a>
   {% else %}
      {{ post.content }}
   {% endif %}
   <hr>
{% endfor %}
