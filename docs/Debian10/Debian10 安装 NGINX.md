---
id: install-nginx-on-debain10
title: Install Nginx on Debian 10
sidebar_label: Debian 10 安装 NGINX
---
### 1,安装依赖项
更新源
```
apt update && apt upgrade -y
```
```
apt install curl gnupg2 ca-certificates lsb-release
```
### 2,设置
要为稳定的 nginx 软件包设置apt存储库，请运行以下命令：
```
echo "deb http://nginx.org/packages/debian `lsb_release -cs` nginx" \
    | sudo tee /etc/apt/sources.list.d/nginx.list
```
如果您想使用主线 nginx 包，请运行以下命令：
```
echo "deb http://nginx.org/packages/mainline/debian `lsb_release -cs` nginx" \
    | sudo tee /etc/apt/sources.list.d/nginx.list
```
### 3,配置密钥
接下来，导入一个官方的 nginx 签名密钥，以便apt可以验证包的真实性：
```
curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo apt-key add  -
```
确认您现在拥有正确的密钥：
```
apt-key fingerprint ABF5BD827BD9BF62
```
输出应包含完整指纹 `573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62` ，如下所示：
```
pub   rsa2048 2011-08-19 [SC] [expires: 2024-06-14]
      573B FD6B 3D8F BC64 1079  A6AB ABF5 BD82 7BD9 BF62
uid   [ unknown] nginx signing key <signing-key@nginx.com>
```
### 4,开始安装
要安装nginx，请运行以下命令：
```
apt install nginx
```
### 5,基本命令
停止服务器：
```
systemctl stop nginx.service
```
启动服务器：
```
systemctl start nginx.service
```
重新启动服务器：
```
systemctl restart nginx.service
```
重新加载配置更改：
```
systemctl reload nginx.service
```
### 6,配置基本站点，编辑：
```
vim /etc/nginx/conf.d/default.conf
```
```
server {
  root /var/www/unus;
  index index.html index.htm;
  error_log /var/log/nginx/error.log error;
}
```
删除自带配置：
```
rm -rf /etc/nginx/conf.d/default.conf
```
创建目录:
```
mkdir /var/www/
```
授权该目录 :
```
chmod 777 -R /var/www
```
### 7,该网站成功运行