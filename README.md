# be-my-season

## Requires

- Ubuntu Focal 20.04 (LTS)
- Node.js 16.14
- Yarn 3.2
- PM2 5.2
- nginx 1.18

## Quick start

### Download source code

```bash
git clone https://github.com/rmfpdlxmtidl/be-my-season.git
cd be-my-season
vi .env.local
```

```
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=

JWT_SECRET_KEY=

KAKAO_ADMIN_KEY=
NEXT_PUBLIC_KAKAO_REST_API_KEY=
```

`.env.local` 파일에 환경 변수를 설정합니다.

#### 1. Start server

```bash
yarn && yarn build && pm2 --name be-my-season start yarn -- start
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
$ ssh -N -L 3306:localhost:3306 서버-사용자@서버-ip
```

로컬 컴퓨터의 3306번 포트와 서버 컴퓨터의 3306번 포트를 SSH로 연결합니다. 일반적으로 MySQL 서버는 3306번에서 동작하기 때문에 3306으로 설정했지만, 다른 포트에서 실행되고 있다면 해당 포트 번호를 써줍니다.

## ETC

### Setting HTTPS

```bash
# Install nginx
sudo apt update
sudo apt install nginx
sudo ufw app list
sudo ufw allow 'Nginx Full'
systemctl start nginx

# Configure nginx
cd /etc/nginx/sites-available
vi 아무이름1
```

```conf
server {
  charset utf-8;
  server_name 대표도메인1 도메인2;

  listen 80;
  listen [::]:80;

  root /var/www/html;
  index index.html index.htm index.nginx-debian.html;

  location / {
    proxy_pass http://localhost:포트1;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_read_timeout 20d;
    # proxy_redirect http://localhost:포트1/ $scheme://$http_host/;
    # proxy_set_header Connection $connection_upgrade;
  }

  # for letsencrypt
  location ~ /.well-known {
    allow all;
  }
}
server {
  charset utf-8;
  server_name 대표도메인3 도메인4;

  listen 80;
  listen [::]:80;

  root /var/www/html;
  index index.html index.htm index.nginx-debian.html;

  location / {
    proxy_pass http://localhost:포트2;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_read_timeout 20d;
    # proxy_redirect http://localhost:포트2/ $scheme://$http_host/;
    # proxy_set_header Connection $connection_upgrade;
  }

  # for letsencrypt
  location ~ /.well-known {
    allow all;
  }
}
```

`/etc/nginx/sites-available` 경로에 아무 이름으로 파일을 만들어서 위 내용을 적절히 바꿔 입력해줍니다.

```bash
# Configure nginx
sudo ln -s /etc/nginx/sites-available/아무이름1 /etc/nginx/sites-enabled/아무이름1
nginx -t
service nginx restart

# Install certbot
sudo apt update && sudo apt install certbot python3-certbot-nginx

# Configure certbot
certbot --nginx -d 대표도메인1 -d 도메인2 -d 대표도메인3 -d 도메인4
certbot certonly --standalone --preferred-challenges http -d 대표도메인1 -d 대표도메인3
certbot renew --dry-run

# Auto renew certificate
crontab -e
```

`nginx -t` 오류 시 `/etc/nginx/sites-enabled` 폴더 내 파일 확인 후 필요없는 파일 삭제

```
0 12 * * * /usr/bin/certbot renew --quiet
```

매일 정오에 서버의 인증서가 다음 30일 이내에 만료되는지 확인하고 만료되면 갱신하는 명령을 실행합니다. `--quiet` 은 certbot이 출력을 생성하지 않게 하는 옵션입니다.

## References

- [Next.js](https://nextjs.org/docs/getting-started)
- [React.js](https://reactjs.org/docs/getting-started.html)
- [MySQL](https://docs.oracle.com/en-us/iaas/mysql-database/doc/getting-started.html)
- [HTML, CSS, JS](https://developer.mozilla.org/en-US/docs/Web/CSS)

##### To do

- program RU
- 결제 API 연동
