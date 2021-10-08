var express = require('express');
var router = express.Router();

var registerInitialCheck = require('../middlewares/registerInitialCheck');
var register = require('../controllers/register');

router.post('/', registerInitialCheck , register);

module.exports = router;