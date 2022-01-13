# webpack react hooks ts

wepack5 + hooks + ts

# node
[eslint](https://www.npmjs.com/package/eslint)  `Prerequisites: Node.js (^12.22.0, ^14.17.0, or >=16.0.0) built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)`

 # @commitlint/cli
 
 # eslint

# 部署配置

### 环境变量

```javascript
window.__config = {
  baseName: '', // 选填
  appId: '', // 必填
}

```


### iconfont
`打包后会在dist文件有一个iconFont目录，这个目录是为了提供一个菜单icon的图标，可以通过外部替换文件来达到icon的更新`

`文件目录中必须包含iconfont.js文件如果需要更新则替换文件即可`

### 部署
为了支持动态修改部署路径 比如 `/auth` 或者 `/` 目录下 引入`__webpack_public_path__ = `${runtime.baseName}/``
```nginx
server {

    listen 80;

    server_name  XXXXX;


    location /auth {
        alias XXXXXX;
        gzip_static on;
        try_files $uri $uri/ /index.html =404;

        proxy_set_header Access-Control-Allow-Origin *;
        add_header Cache-Control no-cache;
    }

    location / {
       proxy_pass http://XXXX/auth;
    }


}

```
