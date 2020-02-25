---
id: how-to-install-Lets-encrypt-on-debain10
title: Install Lets-encrypt on Debain 10
sidebar_label: Debian 10 安装 Lets-encrypt
---

官方文档：https://certbot.eff.org/lets-encrypt/debianbuster-nginx
### 1，安装
```
apt install certbot python-certbot-nginx
```
### 2，支持 Nginx
```
certbot --nginx
```
会弹出输入你的邮箱
按交互提示输入
### 3，自动续订
```
certbot renew --dry-run
```