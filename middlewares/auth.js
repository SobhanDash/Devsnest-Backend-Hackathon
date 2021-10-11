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

// const isVerified = async (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];
//   const bearerToken = bearerHeader.split(" ")[1];
//   const decoded = jwt.verify(bearerToken, SECRET);
//   const id = decoded["id"];

//   if (id) {
//     try {
//       const user = await User.findOne({ where: { id } });
//       if (user) {
//         req.user = {
//           role: user.dataValues.role,
//         };
//         // console.log(user.dataValues.role);
//         next();
//       }
//     } catch (err) {
//       console.log(`Error occured ${err.name}`);
//       res.status(400).send({ message: "Token not found" });
//     }
//   }
// };

const isVerified = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const bearerToken = bearerHeader.split(" ")[1];
  const decoded = jwt.verify(bearerToken, SECRET);
  const id = decoded["id"];

  if (id) {
    try {
      const user = await User.findOne({ where: { id } });
      if (user) {
        req.user = user;
        req.user.role = user.role;
        next();
      }
    } catch (err) {
      console.log(`Error occured ${err.name}`);
      res.status(400).send({ message: "Token not found" });
    }
  }
};

module.exports = { checkRole, isLoggedIn, isVerified };
