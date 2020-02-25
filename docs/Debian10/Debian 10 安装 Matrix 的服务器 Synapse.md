---
id: how-to-install-Synapse-on-debain10
title: 在 Debian 10 上安装 Matrix 的服务器 Synapse
sidebar_label: Debian 10 安装 Matrix 的服务器 Synapse
---
本文讲述如何在服务器部署 Matrix 的服务器 Synapse 。

本文针对 Debian 10 编写 。

[Matrix](http://matrix.org/) 是通过 IP 实现的互通，分散，实时通信的开放标准。它可以给即时通讯， VoIP 和物联网通信提供支持

Synapse 是来自 matrix.org 的核心开发团队的参考家庭服务器实现，用 Python / Twisted 编写。

事先准备：

- Debian 10
- Root 权限
- 域名，如 message.example.com

### 1，更新和升级你的系统并安装依赖项

登录到您的 Debian 服务器并添加存储库密钥，以确保开发人员已签署任何安装和更新，并在你的服务器上阻止安装任何未经授权的软件包。

注：使用 root 登陆到 Debian 所以本文所用到的命令并不会在前面添加 `sudo` 如果您不是通过 root 登陆请在命令前添加 `sudo`。

```
wget -qO - https://matrix.org/packages/debian/repo-key.asc | apt-key add -
```

首先安装包以添加存储库，以添加最新版本的 matrix-synapse 的存储库。

```
apt install software-properties-common
```

```
add-apt-repository https://matrix.org/packages/debian/
```

使用下面的apt命令更新存储库并升级所有软件包。

```
apt update && apt upgrade -y
```

如果在更新或升级时出现错误找不到包，请尝试以下命令。这是 sources.list 文件缺少 “http” 的支持。详细解决方案 ：[链接](https://askubuntu.com/questions/165676/how-do-i-fix-a-e-the-method-driver-usr-lib-apt-methods-http-could-not-be-foun)。

```
apt install apt-transport-https
```

```
apt update
```

```
apt upgrade
```

### 2，环境设置成功，开始安装

如下所示。安装包名为 `matrix-synapse` 。

```
apt install matrix-synapse
```

在安装过程中，它会询问 Matrix 服务器名称，输入你的域名如 `message.example.com` 。

**注意！请输入域名，不要留空直接下一步**

如果您想通过匿名数据报告向团队提供有关您的设置的信息，请选择“ yes ”，否则请将其保留为“ no ”。

Synapse 安装完成后，启动该服务并设置在系统启动时自启动（开机启动）。

```
systemctl start matrix-synapse.service
```

```
systemctl enable matrix-synapse.service
```

Synapse 现在使用端口 ‘8008’ 和 ‘8448’ 上的默认配置启动并运行。 使用netstat命令检查打开的端口。

```
netstat -plntu
```

(您可能需要首先下载 `net-tools` 才能使用 `netstat`，并使用以下命令 `apt install net-tools` )

### 3，配置 Synapse。

在 Synapse 安装之后，我们将其配置为在本地 IP 地址下运行，并禁用了 Synapse 注册，并启用`registration-shared-secret` 。

在编辑主服务器配置之前，我们需要使用以下命令生成共享密钥。

```
cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1
```

你会得到一个生成的密钥。然后将密钥先复制记下到 homeserver 配置文件中。如果启用用户注册，请在 `enable_registration: False` 更改为 `enable_registration: True` 。

```
vim /etc/matrix-synapse/homeserver.yaml
```

```
enable_registration: False
```

```
registration_shared_secret: “输入你记下的密钥”
```

检查侦听器和联合端口

> 注 ： 在 0.99 版本中 该步骤可能会出现错误，直接跳过即可，请注意保存和退出然后直接重启你的服务器 现在检查 HTTP 和 HTTPS 侦听器端口 “8008” 以及联合端口 “8448” 是否绑定到IP地址 `0.0.0.0`（而不是 `127.0.0.1`。同样在 `/etc/matrix-synapse/homeserver.yaml` 配置文件中。

```
port: 8448
    bind_addresses:
      - '0.0.0.0'

    - port: 8008
    bind_addresses: ['0.0.0.0']
```

保存并退出。

重启您的 Synapse 服务。

```
systemctl restart matrix-synapse.service
```

使用以下命令检查 homeserver 服务。

```
netstat -plntu
```

您将获得 Synapse 服务现在在本地 IP 地址。我们已经完成了 Synapse 的安装和配置。

### 4，安装 NGINX 并配置 SSL 。**

```
apt install nginx
```

新建 NGINX 的配置文件。

```
vim /etc/nginx/conf.d/message.example.com.conf
```

`message.example.com.conf` 可以你的服务器名字。

更多配置请查看 NGINX 的文档，这里不多表述。 [Nginx 配置教程](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04) 。

Matrix 客户端发出连接到 Synapse 的请求。您需要配置 Nginx 以侦听这些请求并将它们传递给Synapse，后者正在端口上进行本地侦听。

将以下内容复制并粘贴到文件中。`vim /etc/nginx/conf.d/message.example.com.conf` 。

```
server {
    server_name message.example.com;
    error_log  /var/log/nginx/error.log;

    location / {
        proxy_pass http://localhost:8008;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

软件包提供的默认示例站点配置。如果你不使用，就请删除它：

```
mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled
```

运行该命令测试配置文件中的语法错误。

```
nginx -t
```

根据错误输出更正语法（如果有）。如果未报告任何错误，请使用`systemctl`重新加载Nginx以使更改生效。

```
systemctl reload nginx
```

要使用 Let’s Encrypt 的加密证书完成 Nginx 的安全保护，可以用 https://certbot.eff.org/ 来进行自动化配置。全部完成之后，你的 `message.example.com.conf` 看起来会是这样。 

```
server {
    server_name message.example.com;

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/message.example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/message.example.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    location / {
        proxy_pass http://localhost:8008;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

设置好 Let’s Encrypt 的加密后，您可以继续配置防火墙，以便 Synapse 与其他主机服务器进行通信所需的流量。

### 5，设置防火墙。

客户端流量通过 HTTPS 端口连接到 Synapse `443`（已在防火墙中从Nginx指南打开）。但是，来自其他服务器的流量直接连接到端口上的 Synapse `8448` 而不通过Nginx代理，因此您还需要允许此流量通过防火墙。

```
ufw allow ssh
ufw allow http
ufw allow https
ufw allow 8448
```

start 检查UFW的状态。

```
ufw enable
ufw status
```

它应该如下所示：

```
OutputStatus: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Nginx Full                 ALLOW       Anywhere                  
8448                       ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Nginx Full (v6)            ALLOW       Anywhere (v6)             
8448 (v6)                  ALLOW       Anywhere (v6)
```

### 6，创建一个用户。

在此阶段，Synapse homeserver 安装和配置已完成。在这一步中，我们需要从服务器上的命令行添加一个新的 Matrix 用户。要创建新的 Matrix 用户，请运行以下命令。

```
register_new_matrix_user -c /etc/matrix-synapse/homeserver.yaml http://localhost:8008
```

现在，您需要输入用户名，密码，并确定用户是否具有管理员权限。我们创建了一个具有管理员权限的新 Matrix 用户。

```
自带数据库文件保存在 /var/lib/matrix-synapse/homeserver.db
```

### 7，选择客户端登陆。

这里以 Riot 为例。

![img](https://i.loli.net/2019/01/05/5c302e1ed38e8.jpg)