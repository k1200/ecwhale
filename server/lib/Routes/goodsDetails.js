const express = require('express');
const router = express.Router();
let { getGoodsDetailsController } = require('../Controller/goodsDetails');

/* GET getGoodsDetails page. */

router.get('/getGoodsDetails/:goods_id', (req, res) => getGoodsDetailsController(req, res));
module.exports = router;
