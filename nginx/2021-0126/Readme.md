1. 正向代理：在客户端（浏览器）配置代理服务器，通过代理服务器进行互联网访问
2. 反向代理：
3. 负载均衡
4. 动静分离

## 启动安装

```shell
docker run --name=ng-p1 -p 7777:8080 -d --network ntw-learn \
-v $(pwd)/nginx/learn/p1/www:/usr/share/nginx/html \
-v $(pwd)/nginx/learn/p1/conf.d:/etc/nginx/conf.d  \
-v $(pwd)/nginx/learn/p1/logs:/var/log/nginx  \
nginx
```

## 命令

使用前提条件：进入到nginx的目录中

```bash
docker exec -it d03fceb01dfb /bin/sh
```

## 1. 反向代理

实现效果 在浏览器中输入 www.123.com，跳转到 linux 系统 tomcat 页面

- 把这两个docker 全部都放到一个 `networks` 中

docker-compose:

```yaml
version: '2.0'

networks:
  nginx_learn:
    driver: bridge

services:
  nginx-p1:
    restart: always
    container_name: ng-p1
    image: nginx:1.19.5-alpine
    ports:
      - 7777:8080
    volumes:
      - ./p1/conf.d:/etc/nginx/conf.d
      - ./p1/logs:/var/log/nginx
      - ./p1/dist:/usr/share/nginx/html
    networks:
      - nginx_learn
    command: [nginx-debug, '-g', 'daemon off;']
  nginx-s1:
    restart: always
    container_name: ng-s1
    image: nginx:1.19.5-alpine
    ports:
      - 7778:8081
    volumes:
      - ./s1/conf.d:/etc/nginx/conf.d
      - ./s1/logs:/var/log/nginx
      - ./s1/dist:/usr/share/nginx/html
    networks:
      - nginx_learn
    command: [nginx-debug, '-g', 'daemon off;']

```

p1 conf

- http 后面写得是s1的docker容器别名

```
log_format  mylogs  '$remote_addr @ $remote_user [$time_local] "$request" ';

server {
	listen 8080;
	server_name localhost;
    root   /usr/share/nginx/html;

    location / {
		root   /usr/share/nginx/html;
		index  index.html index.htm;
	    proxy_pass http://nginx-s1:8081;
    }
}
```

s1 conf

```
log_format  mylogs  '$remote_addr @ $remote_user [$time_local] "$request" ';

server {
	listen 8081;
	server_name localhost;
    root   /usr/share/nginx/html;

    location / {
		root   /usr/share/nginx/html;
		index  index.html index.htm;
    }
}
```

### 示例

[fxdl](./fxdl)

## 2. 反向代理2

- 访问 http://127.0.0.1:7777/edu 转到 s1
- 访问 http://127.0.0.1:7777/vod 转到 s2
