# be-my-season

## 개발 환경

- Ubuntu Focal 20.04 (LTS)
- Node.js 16.14
- Yarn 3.2
- Docker 20.10

## 설정

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
