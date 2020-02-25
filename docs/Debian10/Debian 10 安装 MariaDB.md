---
id: install-mariadb-on-debain10
title: Install MariaDB on Debian 10
sidebar_label: Debian 10 安装 MariaDB
---

在撰写本文时，Debian main中提供的最新MariaDB版本是版本10.3。

以 root 身份或使用 sudo 权限
### 1,首先更新包索引：
```
sudo apt update
```

### 2,通过运行以下命令安装MariaDB服务器和客户端软件包：
```
sudo apt install mariadb-server
```
### 3,MariaDB服务将自动启动。要验证它，请检查服务状态：
```
sudo systemctl status mariadb
```
输出应该如下所示：

```
● mariadb.service - MariaDB 10.3.15 database server
   Loaded: loaded (/lib/systemd/system/mariadb.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2019-07-11 14:36:28 PDT; 19min ago
      Docs: man:mysqld(8)
            https://mariadb.com/kb/en/library/systemd/
   Main PID: 4509 (mysqld)
   Status: "Taking your SQL requests now..."
      Tasks: 30 (limit: 2359)
   Memory: 78.6M
   CGroup: /system.slice/mariadb.service
            └─4509 /usr/sbin/mysqld  
```
### 4, 初始化设置
MariaDB 附带了一个脚本，可以帮助您提高安装的安全性。要 `mysql_secure_installation` 在终端中启动脚本类型：
```
sudo mysql_secure_installation
```
系统将提示您为root帐户设置密码，删除匿名用户，限制root用户对本地计算机的访问权限并删除测试数据库。

```
...
Enter current password for root (enter for none):
...
Set root password? [Y/n] Y
New password: 
Re-enter new password: 
...
Remove anonymous users? [Y/n] Y
...
Disallow root login remotely? [Y/n] Y
...
Remove test database and access to it? [Y/n] Y
...
Reload privilege tables now? [Y/n] Y
...
Thanks for using MariaDB!
```
如果选中，脚本将重新加载权限表，确保更改立即生效。
所有步骤都会详细解释，建议对所有问题回答“是”（是）。

默认情况下，MariaDB root用户使用`unix_socket`身份验证插件，该插件在调用`mysql`客户端工具时检查有效用户ID 。

这意味着只有在`mysql`以系统root身份调用命令或将sudo添加到命令时，才能以root身份连接到MariaDB服务器。

为了提高安全性，建议保留默认的身份验证插件，并允许root用户仅通过Unix套接字进行身份验证。

如果要将根身份验证更改为经典身份验证，请登录 MariaDB 服务器：
```
mysql
```
运行以下语句以更改身份验证插件：
```
ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_root_passwd';
```
您现在可以使用新密码连接到MariaDB服务器：
```
mysql -u root -p
```

### 5, 更改身份验证插件还允许您从外部程序（如phpMyAdmin）以root用户身份登录。

如出现错误：


（因为安装完 MariaDB 后只能本地链接数据库）


进行如下操作：

修改`bind-address=127.0.0.1`为 `bind-address=0.0.0.0`
```
vim /etc/mysql/mariadb.conf.d/50-server.cnf
```
进入服务器开启远程账号访问 ：
```
mysql -u root -p
```

```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '你的密码' WITH GRANT OPTION;
```

刷新权限：
```
FLUSH PRIVILEGES;
```

重启：
```
systemctl restart mariadb.service
```