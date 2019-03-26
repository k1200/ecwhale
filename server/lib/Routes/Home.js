const express = require('express');
let { getHomeDataController } = require('../Controller/Home');
const router = express.Router();

/* GET login page. */

router.get('/getHomeData', (req, res) => getHomeDataController(req, res));
module.exports = router;
