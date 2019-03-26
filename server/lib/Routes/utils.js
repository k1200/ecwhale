const express = require('express');
const router = express.Router();
const { getUserInfoController } = require('../Controller/common');

router.get('/getUserInfo/:user_id', (req, res) => getUserInfoController(req, res));
module.exports = router;