# readme

## 1. 简介

这是一个react单页应用模板，使用ts+less编码，webpack打包。
`/config`文件夹存放webpack的配置文件，分为生产环境和开发环境。
`/src`文件夹存放所有代码：
  - `pages`: 存放页面
  - `components`: 存放组件
  - assets: 存放静态资源
    - `img`: 图片资源
    - `style`: 公共\全局样式存放在这里
  - `utils`: 存放工具，如api、格式化工具



```json
"scripts": {
    "dev": "webpack --config config/webpack.config.js",
    "start": "webpack serve --config config/webpack.config.js --open",
    "build": "webpack --config config/webpack.config.prod.js",
    "server": "npm run build && live-server ./build --port=10087"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/react": "^17.0.8",
    "@types/react-dom": "^17.0.5",
    "clean-webpack-plugin": "^4.0.0-alpha.0",
    "css-loader": "^5.2.6",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.1",
    "less": "^4.1.1",
    "less-loader": "^9.0.0",
    "mini-css-extract-plugin": "^1.6.0",
    "ts-loader": "^9.2.2",
    "typescript": "^4.2.4",
    "webpack": "^5.37.1",
    "webpack-cli": "^4.7.0",
    "webpack-dev-server": "^3.11.2",
    "live-server": "^1.2.1"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }

```
项目依赖包含react（及其@types）、react-dom（及其@types）、typescript、less、webpack、webpack-cli、webpack-dev-server、clean-webpack-plugin、css-loader、file-loader、html-webpack-plugin、mini-css-extract-plugin、ts-loader和live-server。

若需要其他的npm包直接npm install即可。

定义了四个初始命令，其中server命令用于生产环境运行。

## 2. 启动

```
npm i

npm run start
```
