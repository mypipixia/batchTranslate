# vue-cartoon

## Project setup
```
cnpm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### 配置说明 static/config.js

```
配置文件

APPID //百度翻译api需要的APPID
KEY //百度翻译api需要的KEY
LOADNUM = 5 //max10 ，min 1,1秒调用的接口数量
从FROM语言转换为TO语言
FROM = 'zh';
TO = 'en';
HTTPAPI = 'http://api.fanyi.baidu.com/api/trans/vip/translate' //百度api地址
HTTPMethod = 'get' //接口类型
```

### 配置说明 static/lang.js

```
需要翻译的文件

const LANG = {};
```