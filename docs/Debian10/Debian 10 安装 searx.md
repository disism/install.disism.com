---
id: how-to-install-searx-on-debain10
title: Install searx on Debain 10
sidebar_label: Debian 10 安装 searx
---
本文演示在 Debian 10 上安装自己的元搜索引擎 [searx](https://github.com/asciimoo/searx) 。

> huyo.me 就是使用的 searx ，查看 [Github](https://github.com/unusme/searx) 上的源代码 。 请访问：[huyo.me](http://huyo.me/) 。

> 假设你是一台新的 Debain 10 。

###  1，安装所需的依赖项

安装 `Git`

```
apt install git
```

安装 `pip`

```
apt install python3-pip
```

安装 `virtualenv`

```
pip3 install virtualenv
```

### 2，使用 Git 下载项目并创建虚拟环境: 进入到所建网站的目录

```
cd /usr/local
```

Git searx

```
git clone https://github.com/asciimoo/searx.git && cd searx
```

创建虚拟环境

```
virtualenv -p python3 venv
```

激活虚拟环境：

```
source venv/bin/activate 
```

你会注意到命令行前多了(venv)

```
(venv) root@ip xxxx:~# 
```

### 3，安装 searx 所需要的依赖项，开启服务器

```
pip3 install -r requirements.txt
```

这个 `requirements.txt` 里包含所有运行 searx 所需要的运行依赖。

```
python3 searx/webapp.py
```

现在你的 searx 已经成功运行。

### 4，开始搭建生产环境

#### ① 使用 uwsgi

```
apt install uwsgi uwsgi-plugin-python3
```

新建配置文件

```
vim /etc/uwsgi/apps-available/searx.ini
```

```
[uwsgi]
# Who will run the code
uid = searx
gid = searx

# disable logging for privacy
disable-logging = true

# Number of workers (usually CPU count)
workers = 4

# The right granted on the created socket
chmod-socket = 666

# Plugin to use and interpretor config
single-interpreter = true
master = true
plugin = python
lazy-apps = true
enable-threads = true

# Module to import
module = searx.webapp

# Virtualenv and python path
virtualenv = /usr/local/searx/venv/
pythonpath = /usr/local/searx/
chdir = /usr/local/searx/searx/
```

创建用户并授权

```
useradd searx -d /usr/local/searx
```

```
chown searx:searx -R /usr/local/searx
```

设置并重启

```
cd /etc/uwsgi/apps-enabled
```

```
ln -s ../apps-available/searx.ini
```

```
/etc/init.d/uwsgi restart
```

#### ② 退出虚拟环境

```
deactivate
```

> 如果需要删除虚拟环境使用 `rm -rf` 直接移除

> 默认情况下，虚拟环境会安装 site packages 里已经存在的第三方包，如果不想安装这些已经存在的第三方包，那么可以加上参数 `--no-site-packages` 比如创建 `searx`

```
virtualenv --no-site-packages searx
```

#### ③ 设置 NGINX

反代 8888 端口

```
server {
    listen 80;

    server_name 域名;
    error_log /var/log/nginx/searx.log error;
    

    location /  { 
        proxy_pass http://127.0.0.1:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header X-Script-Name /searx;
        proxy_buffering off;
    }
}
```

```
server {
    listen 80;
    server_name u-x.pw;
    root /usr/local/searx;
    error_log /var/log/nginx/searx.log error;

    location / {
            include uwsgi_params;
            uwsgi_pass unix:/run/uwsgi/app/searx/socket;
    }
}
```

现在重启你的 nginx 和 uwsgi

```
service nginx restart
service uwsgi restart
```

大功告成，你已经成功搭建了 searx 保护你的搜索隐私

