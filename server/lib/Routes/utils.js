const express = require('express');
const router = express.Router();
const { getUserInfoController, logoutController, getCartCountController, addCartController } = require('../Controller/utils');

router.get('/getUserInfo/:user_id', (req, res) => getUserInfoController(req, res));
router.get('/logout', (req, res) => logoutController(req, res));
router.get('/getCartList/:user_id', (req, res) => getCartCountController(req, res));
router.get('/addCart', (req, res) => addCartController(req, res));
module.exports = router;
