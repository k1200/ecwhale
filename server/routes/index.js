const { isLoginController } = require('../lib/Controller/utils');
const RouterLogin = require('../lib/Routes/Login');
const RouterHome = require('../lib/Routes/Home');
const RouterUtils = require('../lib/Routes/utils');
module.exports = app => {
    app.use('/', RouterLogin);
    app.use('/', RouterHome);
    app.use(isLoginController);
    app.use('/', RouterUtils);
};
