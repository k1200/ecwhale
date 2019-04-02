const express = require('express');
const loginRouter = express.Router();
const normalRouter = express.Router();
const {
    getUserInfoController,
    logoutController,
    getCartCountController,
    addCartController,
    getCategoryController } = require('../Controller/utils');

/**
 * 需要登录
 * */
loginRouter.get('/getUserInfo/:user_id', (req, res) => getUserInfoController(req, res));
loginRouter.get('/logout', (req, res) => logoutController(req, res));
loginRouter.get('/getCartList/:user_id', (req, res) => getCartCountController(req, res));
loginRouter.get('/addCart', (req, res) => addCartController(req, res));

/**
 * 不需要登录
 * */
normalRouter.get('/getCategory', (req, res) => getCategoryController(res, res));
module.exports = {
    loginRouter,
    normalRouter
};
