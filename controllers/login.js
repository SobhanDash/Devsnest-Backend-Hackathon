const User = require("../models/user");

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const pass = await User.findOne({ password: password });

    if (password === pass.password) {
      res.status(202).redirect("/");
    } else {
      res.status(401).send({ msg: "Enter valid email and password" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).send({ msg: err });
  }
};
