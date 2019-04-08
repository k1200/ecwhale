const express = require('express');
const router = express.Router();
let { loginController } = require('../Controller/user');

module.exports = router;
router.post('/login', (req, res) => loginController(req, res));
