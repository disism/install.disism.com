---
id: install-shadowsocks-on-debain10
title: Install Shadowsocks on Debian 10
sidebar_label: Debian 10 安装 Shadowsocks
---

本文将详细介绍如何在 Debian10 上自行搭建 Shadwosocks ，以及在设备上使用等相关步骤。（VPS 服务商为 DigitalOcean）
`shadowsocks-libev` 的项目地址在：shadowsocks-libev，项目内包含英文的安装文档。
### 1,更新与安装 Git
```
apt update && apt upgrade -y
```
```
apt install git -y
```
### 2，下载源代码及编译
```
git clone https://github.com/shadowsocks/shadowsocks-libev.git && cd shadowsocks-libev 
```
```
git submodule update --init --recursive
```
```
mkdir -p ~/build-area/
```
```
cp ./scripts/build_deb.sh ~/build-area/
```
```
cd ~/build-area
```
```
./build_deb.sh
```
### 3，配置服务器并启动
⑴编辑配置文件
```
vim /etc/shadowsocks-libev/config.json
{
    "server":"YOUR_IP_ADRESS",
    "server_port":8388,
    "local_port":1080,
    "password":"Your_PASSWORD",
    "timeout":600,
    "method":"chacha20-ietf-poly1305"
}
```
⑵编辑 Debian 的默认配置（一般不需要）
```
vim /etc/default/shadowsocks-libev
```
#### 启动时开启
START=yes
​
##### 配置文件
CONFFILE="/etc/shadowsocks-libev/config.json"
​
#### 额外的命令行参数
DAEMON_ARGS=
​
#### 用户和组以运行服务器为
USER=nobody
GROUP=nogroup
​
### 最大文件描述符数
MAXFD=32768
​
⑶启动服务
```
/etc/init.d/shadowsocks-libev start    # for sysvinit, or
systemctl start shadowsocks-libev.service      # for systemd
```
4，如何连接

Windows 10 Shadowsocks

![img](https://i.loli.net/2019/07/29/5d3eb004663da49445.png)

大功告成，你现在可以使用 Shadowsocks 了