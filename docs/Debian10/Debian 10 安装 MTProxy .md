---
id: how-to-install-mtproxy-on-debain10
title: Inatall MTProxy
sidebar_label: Debian 10 安装 MTProxy 
---
## Debian 10 上安装 MTProxy

# 搭建 Telegram MTProxy 服务

本文将详细介绍在 Debian10 上如何自行搭建 Telegram 的轻量级 MTProto 代理，包括安装 MTProxy ，生成代理链接，如何在设备上使用等相关步骤。（本文默认是一台新的 VPS ）

MTProxy 的项目地址在：[MTProxy](https://github.com/TelegramMessenger/MTProxy) ，项目内包含英文的详细安装步骤文档。

### 1, 安装依赖项

先要安装你需要构建 MTProxy 所需要的软件包，包括：`Git`，`curl`，`build-essential`。

以及用于开发包的`libssl-dev` 和`zlib1g-dev`

先更新系统

```
apt update && apt upgrade -y
```

开始安装所需要的软件包

```
apt install git -y curl build-essential libssl-dev zlib1g-dev
```

### 2, 编译安装

克隆项目仓库

```
git clone https://github.com/TelegramMessenger/MTProxy && cd MTProxy
```

编译

```
make && cd objs/bin
```

注：编译后的二进制文件在 `objs/bin/mtproto-proxy`

### 3, 运行 MTProxy

获取用于连接 Telegram 服务器的密钥

```
curl -s https://core.telegram.org/getProxySecret -o proxy-secret
```

获取当前 Telegram 的配置，就是当前的 Telegram 的代理配置文件，它偶尔会改变，所以源代码的文档中推荐每天获取一次

```
curl -s https://core.telegram.org/getProxyConfig -o proxy-multi.conf
```

生成用来连接到代理服务器的密钥并保存

```
head -c 16 /dev/urandom | xxd -ps
```

![img](https://i.loli.net/2019/07/28/5d3d3f37a1f6b66793.png)

### 4, 创建服务并运行

创建系统服务（让他开机启动）并使用 `vim` 打开

```
vim /etc/systemd/system/MTProxy.service
```

修改端口号与密钥后粘贴如下代码，XXX替换成你设置的端口号，0000000000000000000000000000 替换成你刚才在 `3` 步骤中生成的密钥

```
[Unit]
Description=MTProxy
After=network.target
​
[Service]
Type=simple
WorkingDirectory=/root/MTProxy/objs/bin
ExecStart=/root/MTProxy/objs/bin/mtproto-proxy -u nobody -p 8888 -H XXX -S 0000000000000000000000000000 --aes-pwd proxy-secret proxy-multi.conf -M 5
Restart=on-failure
​
[Install]
WantedBy=multi-user.target
```

示例如下，我设置的端口号为 443 ，密钥为刚才生成的复制保存下来的密钥：

![img](https://i.loli.net/2019/07/28/5d3d4742b167935727.png)

之后按 `esc` 输入`:wq`保存退出

启动系统服务并将服务添加到开机启动

```
systemctl start MTProxy.service
```

检查服务运行状态，如果运行成功将显示 active

```
systemctl status MTProxy.service
```

```
systemctl enable MTProxy.service
```

### 5, 使用方法

#### ① 第一种方法：编辑下方的代理链接并复制到 telegram 使用

替换 `xxx.xxxx.xxxx.xxx` 为你的服务器 ipv4 地址

替换 `xxx` 为端口号

替换 `0000000000000000000000000000` 为你生成的密钥

```
tg://proxy?server=xxx.xxxx.xxxx.xxx&port=xxx&secret=0000000000000000000000000000
```

如我的服务器 IP 地址为 `165.22.160.174` 端口号为`443` 密钥为 `6f3169d6ab8608f4898d664f97d6fe6e`

所以示例的链接就是

```
tg://proxy?server=206.81.19.253&port=443&secret=6f3169d6ab8608f4898d664f97d6fe6e
```

这里提供一种简单的使用方法，打开你的 Telegram ，打开 Saved Messages（保存的消息） 将上方的代理链接复制上去

![img](https://i.loli.net/2019/07/28/5d3d4a521c71938423.png)

然后点击它会出现

![img](https://i.loli.net/2019/07/28/5d3d4ab51a72f72714.png)

点击 ENABLE 即可使用，同理在 Android 与 IOS 客户端上同样适用

#### ② 第二种方法：使用官方 Bot [@MTProxybot](https://t.me/mtproxybot) 生成代理链接

添加 MTProxy Admin Bot 并点击 /

![img](https://i.loli.net/2019/07/28/5d3d4b9f67c1290079.png)

选择 `/newproxy`

![img](https://i.loli.net/2019/07/28/5d3d4c94d38be87673.png)

根据交互输入域名和端口号如

```
165.22.160.174:443
```

会出现提示 `Now please specify its secret in hex format.`

然后发送生成的密钥，如我生成的 `6f3169d6ab8608f4898d664f97d6fe6e`

![img](https://i.loli.net/2019/07/28/5d3d4e3e2fd6b74719.png)

大功告成，以上为搭建 Telegram MTProxy 服务的详细方法