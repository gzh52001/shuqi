const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use('/lg', createProxyMiddleware({ 
        target: 'https://newbookstoreapi.shuqireader.com', 
        changeOrigin: true,
        pathRewrite:{
            "^lg":""
        }
    }));
    app.use(createProxyMiddleware(
      '/gpu_data',
      {
        target: 'http://ai.shuqireader.com/',    // 目标服务器 host
        changeOrigin: true,
        pathRewrite: {
          '/gpu_data': ''
        }                       //是否需要改变原始主机头为目标URL默认false，
      }
    ));
    app.use(createProxyMiddleware(
      '/shuqi_i',
      {
        target: 'http://203.195.139.74:3000/',    // 目标服务器 host
        changeOrigin: true,
        pathRewrite: {
          '/shuqi_i': ''
        }                       //是否需要改变原始主机头为目标URL默认false，
      }
    ));

    app.use(createProxyMiddleware(
      '/api',
      {
        target: 'https://comment.alwx.alibaba.com/',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    ));

    app.use(createProxyMiddleware(
      '/com_api',
      {
        target: 'http://localhost:6660/',
        changeOrigin: true,
        pathRewrite: {
          '/com_api': ''
        }
      }
    ));

};