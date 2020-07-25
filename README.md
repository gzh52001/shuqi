# 书旗小说网

#### 介绍

* 官网：http://t.shuqi.com/
* 移动端：http://203.195.139.74:3500
* 小说管理系统：http://203.195.139.74

#### 软件架构

react  
redux  
mysql  
node.js  


#### 目录结构

#####  shuqi_cms
  .  
|-- README.md  
|-- TREE.md  
|-- config  
|   |-- env.js  
|   |-- getHttpsConfig.js  
|   |-- jest  
|   |-- modules.js  
|   |-- paths.js  
|   |-- pnpTs.js  
|   |-- webpack.config.js  
|   |-- webpackDevServer.config.js  
|-- package.json  
|-- public  
|   |-- index.html  
|   |-- logo192.png  
|   |-- logo512.png  
|   |-- manifest.json  
|   |-- robots.txt  
|-- scripts  
|   |-- build.js  
|   |-- start.js  
|   |-- test.js  
|-- src  
|   |-- App.css  
|   |-- App.js  
|   |-- App.test.js  
|   |-- api  
|   |-- index.css   
|   |-- index.js  
|   |-- logo.svg  
|   |-- pages  
|   |-- serviceWorker.js  
|   |-- setupTests.js  
|   |-- store  
|   |-- utils  
`-- yarn.lock  

shuqi_webapp(移动)



│  .gitignore
│  config-overrides.js
│  package-lock.json
│  package.json
│  README.md
│  yarn-error.log
│  yarn.lock
│
├─config
│  │  env.js
│  │  getHttpsConfig.js
│  │  modules.js
│  │  paths.js
│  │  pnpTs.js
│  │  webpack.config.js
│  │  webpackDevServer.config.js
│  │
│  └─jest
│          cssTransform.js
│          fileTransform.js
│
├─public
│      favicon.ico
│      index.html
│      logo192.png
│      logo512.png
│      manifest.json
│      robots.txt
│
├─scripts
│      build.js
│      start.js
│      test.js
│
└─src
    │  App.css
    │  App.js
    │  index.js
    │  setupProxy.js
    │
    ├─api
    │      Cartlist.js
    │      getBooklist.js
    │      getList.js
    │      homeApi.js
    │      loginwreg.js
    │      particularsApi.js
    │      require.js
    │      server.js
    │      ZhangjieApi.js
    │
    ├─components
    │  └─BottomNav
    │          bottom.css
    │          bottom.min.css
    │          bottom.scss
    │          index.jsx
    │
    ├─layout
    │  └─PageLoyout
    │          index.jsx
    │
    ├─pages
    │  ├─Car
    │  │      Cardetail.scss
    │  │      index.jsx
    │  │
    │  ├─Choose
    │  │      Choose.scss
    │  │      index.jsx
    │  │
    │  ├─CommentArea
    │  │      CommentArea.css
    │  │      CommentArea.min.css
    │  │      CommentArea.scss
    │  │      index.js
    │  │
    │  ├─Detail
    │  │      index.jsx
    │  │      Particulars.scss
    │  │
    │  ├─Home
    │  │      home.css
    │  │      home.min.css
    │  │      home.scss
    │  │      index.jsx
    │  │
    │  ├─Login
    │  │      index.jsx
    │  │      login.scss
    │  │
    │  ├─Mine
    │  │      index.jsx
    │  │      lmhmine.scss
    │  │
    │  ├─Particulars
    │  │      index.js
    │  │      Particulars.css
    │  │      Particulars.min.css
    │  │      Particulars.scss
    │  │
    │  ├─Reg
    │  │      index.jsx
    │  │      reg.scss
    │  │
    │  ├─Search
    │  │      index.jsx
    │  │
    │  ├─Searchs
    │  │      Searchs.css
    │  │      Searchs.js
    │  │      Searchs.min.css
    │  │      Searchs.scss
    │  │
    │  ├─Zhangjie
    │  │      index.js
    │  │      zhangjie.scss
    │  │
    │  ├─_404page
    │  │      index.jsx
    │  │
    │  └─_ChooseDetail
    │          ChooseD.scss
    │          index.jsx
    │
    ├─Routes
    │      index.jsx
    │
    ├─static
    │  ├─css
    │  │      common.css
    │  │
    │  ├─iconfont
    │  │      demo.css
    │  │      demo_index.html
    │  │      iconfont.css
    │  │      iconfont.eot
    │  │      iconfont.js
    │  │      iconfont.json
    │  │      iconfont.svg
    │  │      iconfont.ttf
    │  │      iconfont.woff
    │  │      iconfont.woff2
    │  │
    │  └─js
    │          flexble.js
    │
    ├─store
    │      index.js
    │
    └─utils
            server.js

#### 团队与分工

##### 团队

* 组长：李铭航，成员：唐国绍,林桂林

##### 负责模块说明

* 林桂林
  * 负责：小说管理系统前端页面实现
  * 参与：小说管理系统后台接口设计，完成搜索、章节更新模块、评论管理模块接口
  * 小说管理系统界面
    ![小说管理](http://m.qpic.cn/psc?/V11b1aXr1KCcEK/TmEUgtj9EK6.7V8ajmQrEGvEOZj8AOVBnkCkFPlHRtFrMb48XT1ZlscIaFHR4f0rGn6AbJNLObLp0TvkD5Jcfo8wd6bDdtoKZWCkTtm.Fqc!/b&bo=gAepAwAAAAADJy8!&rf=viewer_4&t=5)
  * 新增小说
    ![新增小说](http://m.qpic.cn/psc?/V11b1aXr1KCcEK/TmEUgtj9EK6.7V8ajmQrEEFy3hqlZg46vslwC1kz3DWWvKhDDEcvSt1BsqbX6KkU2I.17T.KO70ez*FMtRXrfqgaLIvBukrqw7D5F9ZIYBI!/b&bo=gAepAwAAAAADJy8!&rf=viewer_4&t=5)
  * 修改小说
    ![修改小说](http://m.qpic.cn/psc?/V11b1aXr1KCcEK/TmEUgtj9EK6.7V8ajmQrEPf.qsKUpxQCAbDWVJET5FENDxG6CXP0ueDG7S.fkk1hr95L9QQlhCB5qJfOrBtiQ3c9FN9wL1Us9rMDuGAwZNM!/b&bo=gAepAwAAAAADJy8!&rf=viewer_4&t=5)
  * 章节更新
    ![章节更新](http://m.qpic.cn/psc?/V11b1aXr1KCcEK/TmEUgtj9EK6.7V8ajmQrEI3fbVGFjDRfyOHh9SvdRce0xPsZdqY84TGLlLvgbf97Uhhah3QK.TyXDHQu9pNIV9ibVBH7hPo*.9WiYJCAtcA!/b&bo=gAepAwAAAAADFx8!&rf=viewer_4&t=5)

 

 * 李铭航 

   * 负责：我的 分类 分类列表 登录 注册 书架  章节 页面 数据库 用户和书本接口
   * 参与：小说管理系统后台接口设计，完成搜索完善
   * 前端页面

后端服务器

![输入图片说明](https://images.gitee.com/uploads/images/2020/0724/163100_cc0c2fe6_7644835.png "psc.png")



![输入图片说明](https://images.gitee.com/uploads/images/2020/0724/163437_89a47b87_7644835.png "4.png")

我的

![输入图片说明](https://images.gitee.com/uploads/images/2020/0724/163706_212f6bf7_7644835.png "psc (1).png")

登录页面

![输入图片说明](https://images.gitee.com/uploads/images/2020/0724/163449_78f097ba_7644835.png "5.png")

章节内容

![输入图片说明](https://images.gitee.com/uploads/images/2020/0724/163503_7a1fc3e5_7644835.png "6.png")


 * 唐国绍

   * 负责：主页详情页搜索评论
   * 参与：书架完善 后台接口设计 数据库编写
   * 前端页面
   
* 截图：
 首页

![首页上](https://images.gitee.com/uploads/images/2020/0724/174823_506756b2_7644835.png "1.png")![首页下](https://images.gitee.com/uploads/images/2020/0724/174857_59b942a3_7644835.png "2.png")

搜索页

![搜索页](https://images.gitee.com/uploads/images/2020/0724/191609_e5249766_7644835.png "3.png")

详情页

![详情页上](https://images.gitee.com/uploads/images/2020/0724/191643_1205ad38_7644835.png "4.png")![详情页下](https://images.gitee.com/uploads/images/2020/0724/191656_72633eba_7644835.png "5.png")

评论页

![详情页](https://images.gitee.com/uploads/images/2020/0724/191824_f38747b9_7644835.png "在这里输入图片标题")

写评论

![写评论](https://images.gitee.com/uploads/images/2020/0724/191924_71013e64_7644835.png "7.png")


   具体看视频 或 访问 http://203.195.139.74:3500/    http://203.195.139.74
