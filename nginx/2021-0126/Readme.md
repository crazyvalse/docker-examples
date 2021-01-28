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

- 访问 http://127.0.0.1:7777/edu/ 转到 s1
- 访问 http://127.0.0.1:7777/vod/ 转到 s2

> 注意：后面得有 `/`

配置：

p1 中的配置：

```
server {
	listen 8080;
	server_name localhost;
	location ~ /vod/ {
		proxy_pass http://nginx-s2:8080;
	}
    location ~ /edu/ {
	    proxy_pass http://nginx-s1:8080;
    }
}
```

## location:

- =: 用于不包含正则表达式的 uri 前，要求请求字符串与uri严格匹配，如果匹配成功，就停止继续向下搜索并立即处理该请求；
- ~: 用于表示 uri 包含正则表达式，并且区分大小写
- ~*: 用于表示 uri 包含正则表达式，并且区分 **不** 大小写
- ^~: 用于不包含正则表达式的 uri 前，要求 Nginx 服务器找到标识 uri 和请求字符串匹配度最高的 location 后，立即使用此 location 处理请求，而不再使用 location 块中的正则 uri 和请求字符串做匹配。

> 如果 uri 包含正则表达式，则必须要有 ~ 或者 ~* 标识。

## 3. 负载均衡

nginx/2021-0126/fzjh/p1/conf.d/default.conf

```
upstream myserver {
    server nginx-s1:8080 weight=1;
	server nginx-s2:8080 weight=1;
}

server {
	listen 8080;
	server_name localhost;
	location / {
		proxy_pass http://myserver;
	    proxy_connect_timeout 100;
	}
}
```

分配策略

### 1. 轮询（默认）

每个请求按照时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。

```
upstream myserver {
    server nginx-s1:8080;
	server nginx-s2:8080;
}
```

### 2. weight

weight 代表权重，默认为1，权重越高被分配的客户端越多。

指定轮询几率，weight和访问率成正比，用于后端服务器性能不均的情况

```
upstream myserver {
    server nginx-s1:8080 weight=1;
	server nginx-s2:8080 weight=1;
}
```

### 3. ip_hash

每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session问题；

```
upstream myserver {
    ip_hash;
    server nginx-s1:8080;
	server nginx-s2:8080;
}
```

### 4. fair

根据响应时间，响应时间短就先分配。

```
upstream myserver {
    server nginx-s1:8080;
	server nginx-s2:8080;
	fair;
}
```

## 4. 动静分离

autoindex on；可以显示目录

## 5. 高可用

当 nginx 宕机之后怎么办？ 主从服务器（nginx），使用 `keepalived`

## 6. 最大支持的并发数

worker_connections * worker_processes / 2

每个worker支持的最大连接数是 1024，根据cpu的数量配置processes 例如4

所以一般是 1024 * 4 / 2 = 2048

## 7. 设置缓存

nginx https://linux.cn/article-5945-1.html
