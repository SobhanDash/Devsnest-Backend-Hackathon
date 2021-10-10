var express = require("express");
var router = express.Router();

let registerInitialCheck = require("../middlewares/registerInitialheck");
let register = require("../controllers/register");
let { login, logout } = require("../controllers/login");
let {
  getUserInfo,
  changeInfo,
  updateActivity,
  deleteUser,
} = require("../controllers/user");
let { isLoggedIn, isVerified, checkRole } = require("../middlewares/auth");
const { SECRET } = require("../config");

// http://localhost:5000/api/user/login
router.post("/user/login", login);

// http://localhost:5000/api/user/logout
router.get("/user/logout", logout);

// http://localhost:5000/api/user/register
router.post("/user/register", registerInitialCheck, register);

// http://localhost:5000/api/user/profile/info/:emailId
router.get(
  "/user/profile/info/:emailId",
  ...isLoggedIn(),
  isVerified,
  getUserInfo
);

// http://localhost:5000/api/user/profile/info/:emailId
router.put(
  "/user/profile/info/:emailId",
  ...isLoggedIn(),
  isVerified,
  checkRole(["student"], changeInfo)
);

// http://localhost:5000/api/user/profile/active/:isActive/:emailId
router.put(
  "/user/profile/active/:isActive/:emailId",
  ...isLoggedIn(),
  isVerified,
  checkRole(["admin"], updateActivity)
);

// http://localhost:5000/api/user/profile/info/:emailId
router.delete(
  "/user/profile/info/:emailId",
  ...isLoggedIn(),
  isVerified,
  deleteUser
);

// https://localhost:5000/api/user/testRoute
router.get("/user/test", ...isLoggedIn(), isVerified, (req, res) => {
  res.status(200).send({
    message: "Authorized",
  });
});

module.exports = router;
