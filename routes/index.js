
var express = require('express');
var router = express.Router();

/* GET home page. */
//router.use('/login',require('./login'))
//router.use('/logout',require('./logout'))
router.use('/register',require('./register'))


module.exports = router;
