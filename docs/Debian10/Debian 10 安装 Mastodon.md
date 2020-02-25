---
id: how-to-install-Mastodon-on-debain10
title: Install Mastodon on Debain 10
sidebar_label: Debian 10 安装 Mastodon 
---

# Install Mastodon on Debian 10
### 安装 Mastondon 所需要的软件包

install fail2ban



```
apt install -y fail2ban
```

## **install curl**



```
apt install -y curl
```

## **install nodejs**



```
curl -sL https://deb.nodesource.com/setup_10.x | bash -
```



```
apt install -y nodejs
```

## **install yarn**



```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```



```
apt update && apt install yarn
```

## **install System packages**



```
apt install -y \
  imagemagick ffmpeg libpq-dev libxml2-dev libxslt1-dev file git\
  g++ libprotobuf-dev protobuf-compiler pkg-config gcc autoconf \
  bison build-essential libssl-dev libyaml-dev libreadline-dev \
  zlib1g-dev libncurses5-dev libffi-dev libgdbm6 libgdbm-dev \
  redis-server redis-tools \
  libidn11-dev libicu-dev libjemalloc-dev
```

## **Install Ruby**



```
adduser --disabled-login mastodon
```



```
su - mastodon
```



```
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
cd ~/.rbenv && src/configure && make -C src
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
```



```
exec bash
```



```
type rbenv
```



```
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

See [ruby-version](https://github.com/tootsuite/mastodon/blob/master/.ruby-version) , if 2.6.1



```
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install 2.6.1
rbenv global 2.6.1
```



```
gem update --system
```



```
gem install bundler --no-document
```



```
exit
```

## **Install PostgreSQL**

Install PostgreSQL-11 https://wiki.postgresql.org/wiki/Apt



```
curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```



```
vim /etc/apt/sources.list.d/pgdg.list
```



```
deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main
```



```
apt update && apt upgrade -y
```



```
apt install postgresql-11 pgadmin4
```

## **Creating a user**



```
sudo -u postgres psql
```



```
CREATE USER mastodon CREATEDB;
\q
```

## **Install Mastodon**



```
su - mastodon
```



```
git clone https://github.com/tootsuite/mastodon.git live && cd live
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```



```
bundle install \
  -j$(getconf _NPROCESSORS_ONLN) \
  --deployment --without development test
  yarn install --pure-lockfile
```



```
RAILS_ENV=production bundle exec rake mastodon:setup
```



```
exit
```

## **NGINX**



```
map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}
server {
  listen 80;
  listen [::]:80;
  server_name 域名;
  root /home/mastodon/live/public;
  # Useful for Let's Encrypt
  location /.well-known/acme-challenge/ { allow all; }
  location / { return 301 https://$host$request_uri; }
}
server {
  listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/域名/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/域名/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

  keepalive_timeout    70;
  sendfile             on;
  client_max_body_size 80m;
  root /home/mastodon/live/public;
  gzip on;
  gzip_disable "msie6";
  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_buffers 16 8k;
  gzip_http_version 1.1;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
  add_header Strict-Transport-Security "max-age=31536000";
  location / {
    try_files $uri @proxy;
  }
  location ~ ^/(emoji|packs|system/accounts/avatars|system/media_attachments/files) {
    add_header Cache-Control "public, max-age=31536000, immutable";
    try_files $uri @proxy;
  }
  
  location /sw.js {
    add_header Cache-Control "public, max-age=0";
    try_files $uri @proxy;
  }
  location @proxy {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header Proxy "";
    proxy_pass_header Server;
    proxy_pass http://127.0.0.1:3000;
    proxy_buffering off;
    proxy_redirect off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    tcp_nodelay on;
  }
  location /api/v1/streaming {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header Proxy "";
    proxy_pass http://127.0.0.1:4000;
    proxy_buffering off;
    proxy_redirect off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    tcp_nodelay on;
  }
  error_page 500 501 502 503 504 /500.html;
}
```

## **Use Let’s Encrypt**



```
在该文档中查询
```

## **Systemctl Service**



```
cd /etc/systemd/system/
```



```
vim mastodon-web.service
```



```
[Unit]
Description=mastodon-web
After=network.target
[Service]
Type=simple
User=mastodon
WorkingDirectory=/home/mastodon/live
Environment="RAILS_ENV=production"
Environment="PORT=3000"
ExecStart=/home/mastodon/.rbenv/shims/bundle exec puma -C config/puma.rb
ExecReload=/bin/kill -SIGUSR1 $MAINPID
TimeoutSec=15
Restart=always
[Install]
WantedBy=multi-user.target
```



```
vim mastodon-sidekiq.service
```



```
[Unit]
Description=mastodon-sidekiq
After=network.target
[Service]
Type=simple
User=mastodon
WorkingDirectory=/home/mastodon/live
Environment="RAILS_ENV=production"
Environment="DB_POOL=5"
ExecStart=/home/mastodon/.rbenv/shims/bundle exec sidekiq -c 5 -q default -q push -q mailers -q pull
TimeoutSec=15
Restart=always
[Install]
WantedBy=multi-user.target
```



```
vim mastodon-streaming.service
```



```
[Unit]
Description=mastodon-streaming
After=network.target
[Service]
Type=simple
User=mastodon
WorkingDirectory=/home/mastodon/live
Environment="NODE_ENV=production"
Environment="PORT=4000"
ExecStart=/usr/bin/npm run start
TimeoutSec=15
Restart=always
[Install]
WantedBy=multi-user.target
```



```
systemctl start mastodon-web mastodon-sidekiq mastodon-streaming
systemctl enable mastodon-*
```