const { isLoginController } = require('../lib/Controller/utils');
const RouterLogin = require('../lib/Routes/Login');
const RouterRegister = require('../lib/Routes/Register');
const RouterHome = require('../lib/Routes/Home');
const { loginRouter, normalRouter } = require('../lib/Routes/utils');
const RouterGoodsDetails = require('../lib/Routes/goodsDetails');
module.exports = app => {
    app.use('/', RouterLogin);
    app.use('/', RouterHome);
    app.use('/', RouterGoodsDetails);
    app.use('/', normalRouter);
    app.use('/', RouterRegister);
    app.use(isLoginController);
    app.use('/', loginRouter);
};
