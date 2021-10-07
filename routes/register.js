var express = require('express');
var router = express.Router();

var registerInitialCheck = require('../middlewares/registerInitialheck');
var register = require('../controllers/user_regsiter');

router.post('/', registerInitialCheck , register);

module.exports = router;