const { isValidEmail, isValidPassword } = require("../utils/validate");

const registerInitialCheck = (req, res, next) => {
  const { email, password } = req.body;
  if (
    typeof email === "string" &&
    typeof password === "string" &&
    email.length > 0 &&
    password.length > 8 &&
    isValidEmail(email) &&
    isValidPassword(password)
  ) {
    next();
  } else {
    res.status(401).send("Initial checks failed");
  }
};

module.exports = registerInitialCheck;
