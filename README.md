# be-my-season

## 개발 환경

- Ubuntu Focal 20.04 (LTS)
- Node.js 16.14
- Yarn 3.2
- PM2 5.2

## 설정

### Start server

```bash
git clone https://github.com/rmfpdlxmtidl/be-my-season.git
cd be-my-season
vi .env.local
./restart-server
```

### 환경 변수

```

```

### Docker 설치

```bash
# https://docs.docker.com/engine/install/ubuntu/#install-from-a-package
$ dpkg --print-architecture

# https://download.docker.com/linux/ubuntu/dists/focal/pool/stable/amd64/
# containerd.io_버전.deb  docker-ce-cli_버전.deb  docker-ce_버전.deb 3가지 파일 다운로드
$ scp 파일위치 root@103.55.191.69:/root

# containerd.io_버전.deb  docker-ce-cli_버전.deb  docker-ce_버전.deb 순으로 설치
$ sudo dpkg -i 파일위치
```

### MySQL SSH 연결

```bash
$ ssh -N -L 3306:localhost:3306 root@103.55.191.69
```

###

```bash
$ docker run \
  -d \
  -e MYSQL_CONNECTION_STRING=mysql://heart:theheart12@localhost:3306/myseason \
  -e JWT_SECRET_KEY=1234 \
  -e NEXT_PUBLIC_KAKAO_REST_API_KEY=a5c51ab95682d2515fa7fcfd434077d6 \
  --name be-my-season \
  -p 80:3000 \
  --restart=unless-stopped \
  be-my-season:latest
```
