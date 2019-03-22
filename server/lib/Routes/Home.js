const express = require('express');
let { getHomeData } = require('../Controller/Home');
const router = express.Router();

/* GET login page. */

router.get('/getHomeData', (req, res) => getHomeData(req, res));
module.exports = router;