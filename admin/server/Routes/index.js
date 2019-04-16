// 路由模块使用前需要先安装和实例化
const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');
const router = require('koa-router')();
const createApp = require('../../dist/vue-ssr-client-manifest.json');

// router.routes()
exports = module.exports = app => {
    // 首页
    // app.use(async (ctx, next) => {
    //     if (ctx.request.path === '/') {
    //         ctx.response.status = 200;
    //         ctx.response.body = 'index'
    //     }
    //     await next()
    // });

    const renderer = createBundleRenderer('../../dist/vue-ssr-client-manifest.json', {
        runInNewContext: false, // 推荐
        // template, // （可选）页面模板
        // clientManifest // （可选）客户端构建 manifest
    });

    app.use((ctx, next) => {
        const context = { url: ctx.request.path };
        const res = ctx.response;
        createApp(context).then(app => {
            renderer.renderToString(app, async (err, html) => {
                if (err) {
                    if (err.code === 404) {
                        res.status(404).end('Page not found')
                    } else {
                        res.status(500).end('Internal Server Error')
                    }
                } else {
                    res.end(`<!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>`);
                    // if (ctx.request.path === '/') {
                    //     ctx.response.status = 200;
                    //     ctx.response.body = 'index'
                    // }
                    await next();
                }
            })
        });
    });


// 其他页面通过 router 加载
    let routers = fs.readdirSync(__dirname);
    routers.forEach((element) => {
        if (element !== 'index.js') {
            let module = require(__dirname + '/' + element)
            /*
              routers 下面的每个文件负责一个特定的功能，分开管理
              通过 fs.readdirSync 读取 urls 目录下的所有文件名，挂载到 router 上面
            */
            router.use('/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
        }
    });
    app.use(router.routes());
};