const express = require('express');
let { getShopInfoController, loginController } = require('../Controller/Login');
const router = express.Router();

/* GET login page. */

router.get('/getShopInfo', (req, res) => getShopInfoController(req, res));
router.post('/login', (req, res) => loginController(req, res));
module.exports = router;