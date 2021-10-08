var express = require('express');
var router = express.Router();

var registerInitialCheck = require('../middlewares/registerInitialheck');
var register = require('../controllers/regsiter');

router.post('/', registerInitialCheck , register);

module.exports = router;