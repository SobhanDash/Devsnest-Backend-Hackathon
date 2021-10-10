const expressJwt = require("express-jwt");
const { SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkRole = (roles) => (req, res, next) => {
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();
};

const isLoggedIn = () => {
  return [
    function (req, res, next) {
      const bearerHeader = req.headers["authorization"];
      if (typeof bearerHeader !== undefined) {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
      } else {
        res.status(402).send({ message: "Unauthorized" });
      }
    },
  ];
};

const isVerified = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const bearerToken = bearerHeader.split(" ")[1];
  const decoded = jwt.verify(bearerToken, SECRET);
  const id = decoded["id"];

  if (id) {
    try {
      const user = await User.findOne({ where: { id } });
      console.log(user);
      if (user) {
        next();
      }
    } catch (err) {
      console.log(`Error occured ${err.name}`);
    }
  }
};

const isAdmin = (req, res, next) => {};

const isBatchLeader = (req, res, next) => {};

const isTeamLeader = (req, res, next) => {};

const isVTL = (req, res, next) => {};


module.exports = { checkRole, isLoggedIn, isVerified };
