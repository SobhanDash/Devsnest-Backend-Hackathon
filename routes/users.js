var express = require("express");
var router = express.Router();

let registerInitialCheck = require("../middlewares/registerInitialheck");
let register = require("../controllers/register");
let { login, logout } = require("../controllers/login");

router.post("/user/login", login);
router.get("/user/logout", logout);
router.post("/user/register", registerInitialCheck, register);

module.exports = router;
