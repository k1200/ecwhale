const express = require('express');
const router = express.Router();
let { registerController } = require('../Controller/Register');

module.exports = router;
router.post('/register', (req, res) => registerController(req, res));