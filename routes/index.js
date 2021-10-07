var express = require("express");
var router = express.Router();
let { login, logout } = require("../controllers/login");
let { register } = require("../controllers/register");
let registerChecks = require("../middlewares/registerChecks");

/* GET home page. */
router.use("/login", login);
router.use("/logout", logout);
router.use("/register", registerChecks, register);

module.exports = router;
