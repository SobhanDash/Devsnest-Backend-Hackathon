var express = require("express");
var router = express.Router();

let registerInitialCheck = require("../middlewares/registerInitialheck");
let { checkRole, isLoggedIn, isVerified } = require("../middlewares/auth");
let register = require("../controllers/register");
let { login, logout } = require("../controllers/login");
let {
  getUserInfo,
  changeInfo,
  updateActivity,
  deleteUser,
} = require("../controllers/user");
const User = require("../models/user");

router.param("emailId", async (req, res, next, emailId) => {
  if (emailId) {
    try {
      const user = await User.findOne({ where: { email: emailId } });
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).send({ message: "Invalid User" });
      }
    } catch (error) {
      return res.status(404).send({ message: "Email not found", err: error });
    }
  }
});

router.param("isActive", async (req, res, next, isActive) => {
  try {
    const active = isActive === "true" ? true : false;
    req.body.isActive = active;
    // console.log(req.body.isActive);
    next();
  } catch (error) {
    res.status(400).send({ message: "Issue in isActive", err: error });
  }
});


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
  changeInfo
);

// http://localhost:5000/api/user/profile/active/:isActive/:emailId
router.put(
  "/user/profile/active/:isActive/:emailId",
  ...isLoggedIn(),
  isVerified,
  checkRole(["admin", "batch-leader"]),
  updateActivity
);

// http://localhost:5000/api/user/profile/info/:emailId
router.delete(
  "/user/profile/info/:emailId",
  ...isLoggedIn(),
  isVerified,
  checkRole(["admin", "batch-leader"]),
  deleteUser
);

// http://localhost:5000/api/user/testRoute
router.get("/user/test", ...isLoggedIn(), isVerified, (req, res) => {
  res.status(200).send({
    message: "Authorized",
  });
});

module.exports = router;
