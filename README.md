# be-my-season

## Requires

- Ubuntu Focal 20.04 (LTS)
- Node.js 16.14
- Yarn 3.2
- PM2 5.2
- nginx 1.18

## 설정

### Download source code

```bash
git clone https://github.com/rmfpdlxmtidl/be-my-season.git
cd be-my-season
yarn
vi .env.local
```

```
MYSQL_CONNECTION_STRING=
JWT_SECRET_KEY=
KAKAO_ADMIN_KEY=
NEXT_PUBLIC_KAKAO_REST_API_KEY=
```

`.env.local` 파일에 환경 변수를 설정합니다.

#### 1. Start server

```bash
yarn build && pm2 --name be-my-season start yarn -- start
```

성능에 최적화된 서버를 실행합니다.

#### 2. Restart server

```bash
./restart-server
```

성능에 최적화된 서버를 재실행합니다.

#### 3. Start server on local development environment

```
yarn dev
```

개발 환경에 최적화된 서버를 실행합니다. 코드 변경 사항을 저장하면 서버가 자동으로 재실행됩니다.

### Connect to MySQL via SSH

```bash
$ ssh -N -L 3306:localhost:3306 cloud-mysql-server-user-name@cloud-mysql-server-ip
```

로컬 개발 환경에서 클라우드 MySQL 서버에 SSH 접속하고 싶을 때 실행합니다.

### Setting HTTPS

```bash
# Install nginx
sudo apt update
sudo apt install nginx
sudo ufw app list
sudo ufw allow 'Nginx HTTP'
systemctl start nginx

# Configure nginx
cd /etc/nginx/sites-available
vi 도메인
```

```conf
# *q is our domain, replace port 3000 with your port number
server {
  listen 80;
  listen [::]:80;

  root /var/www/html;
  index index.html index.htm index.nginx-debian.html;

  server_name 도메인 www.도메인;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # for letsencrypt
  location ~ /.well-known {
    allow all;
  }
}
```

`/etc/nginx/sites-available` 경로에 `도메인` 파일을 만들어서 위 내용을 적절히 바꿔 입력해줍니다.

```bash
# Configure nginx
sudo ln -s /etc/nginx/sites-available/도메인 /etc/nginx/sites-enabled/도메인
nginx -t
service nginx restart

# Install certbot
sudo apt update && sudo apt install certbot python3-certbot-nginx

# Configure certbot
certbot --nginx -d 도메인 -d www.도메인
certbot certonly --standalone --preferred-challenges http -d 도메인
certbot renew --dry-run

# Auto renew certificate
crontab -e
```

```
0 12 * * * /usr/bin/certbot renew --quiet
```

매일 정오에 서버의 인증서가 다음 30일 이내에 만료되는지 확인하고 만료되면 갱신하는 명령을 실행합니다. `--quiet` 은 certbot이 출력을 생성하지 않게 하는 옵션입니다.
