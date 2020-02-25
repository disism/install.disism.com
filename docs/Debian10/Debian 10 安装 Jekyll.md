---
id: how-to-install-jekyll-on-debain10
title: Install Jekyll on Debain 10
sidebar_label: Debian 10 安装 Jekyll
---

### 1，系统更新并安装软件
```
apt update && apt upgrade -y
```
安装 ruby
```
apt install ruby-full build-essential
```
安装 Jekyll
```
gem install jekyll bundler
```
检查 Jekyll 是否安装
```
jekyll -v
```
### 2，安装成功，创建一个 Jekyll 网站
```
jekyll new site
```
进入到 site
```
cd site
```
本地预览
```
bundle exec jekyll serve
```
在浏览器中打开 http://localhost:4000 你将可以看到刚刚创建的 Jekyll 网站