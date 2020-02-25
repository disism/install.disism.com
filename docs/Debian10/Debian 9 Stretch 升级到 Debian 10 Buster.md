---
id: win10wsl-debian-9-update-debain10
title: Windows 10 WSL Debian 9 Stretch 升级到 Debian 10 Buster
sidebar_label: Windows 10 WSL Debian 9 Stretch 升级到 Debian 10 Buster
---

### 1，将你的 Debian 9 升级到最新状态
```
apt update && apt upgrade -y
apt dist-upgrade
```
### 2，使用 vim 打开更新源 vim /etc/apt/sources.list
粘贴如下镜像源 （阿里镜像源）
```
deb http://mirrors.aliyun.com/debian buster main contrib non-free
deb http://mirrors.aliyun.com/debian buster-proposed-updates main contrib non-free
deb http://mirrors.aliyun.com/debian buster-updates main contrib non-free
deb http://mirrors.aliyun.com/debian-security/ buster/updates main non-free contrib
```
### 3，再升级
```
apt upgrade -y
apt dist-upgrade
```
### 4，然后升级成功之后删除缓存 
```
apt autoremove
```
### 5，最后查看系统版本
```
cat /etc/issue
```
会显示出如下
`Debian GNU/Linux 10 (buster)`
