const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    console.log(user);
    const isPassSame = await bcrypt.compare(password, user.password);

    if (isPassSame) {
      // Sign in the token and issue it to the user
      let token = jwt.sign(
        {
          id: user.id,
        },
        SECRET,
        { expiresIn: "8h" }
      );
      console.log(token);
      let result = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: `Bearer ${token}`,
        expiresIn: 168,
      };

      return res.status(200).json({
        ...result,
        message: "You are now logged in.",
        success: true,
      });
    } else {
      res
        .status(401)
        .json({ message: "Enter valid email and password", success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(400).send({ msg: err });
  }
};

exports.logout = (req, res) => {
  return res.status(200).send({
    message: "User logged out successfully",
  });
};
