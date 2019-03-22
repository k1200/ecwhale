const express = require('express');
let { getShopBaseinfo, login } = require('../Controller/Login');
const router = express.Router();

/* GET login page. */

router.get('/getShop', (req, res) => getShopBaseinfo(req, res));
router.post('/login', (req, res) => login(req, res));
module.exports = router;