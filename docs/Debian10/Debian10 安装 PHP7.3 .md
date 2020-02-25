---
id: install-php7.3-on-debain10
title: Install PHP7.3 on Debian 10
sidebar_label: Debian 10 安装 PHP7.3
---

### 1,使用 https://deb.sury.org/ 提供的DPA（Debian包存档）：
```
apt install apt-transport-https lsb-release ca-certificates
```
```
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
```
```
sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
```
apt update && apt upgrade -y
### 2,查看是否存在 PHP7.3：
```
apt-cache search php7.3
```
### 3,安装自己需要的软件包：
```
apt install php7.3 php7.3-common php7.3-cli php7.3-fpm  php7.3-mysql
```
### 4,给 NGINX 授权：
```
usermod -a -G www-data nginx
```
### 5,重启 PHP7.3 & NGINX
```
systemctl restart php7.3-fpm
```
```
systemctl restart nginx.service
```