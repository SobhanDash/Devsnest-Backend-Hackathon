const User = require("../models/user");

exports.getUserInfo = (req, res) => {
  const { name, email, profileImage, phone, team, isActive } = req.user;
  res.status(200).json({
    name,
    email,
    profileImage,
    phone,
    team,
    isActive,
  });
};

exports.changeInfo = async (req, res) => {
  const user = req.user;
  try {
    //TODO: change info only by user
    res.send(user);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Unable to update user info", errorMessage: error });
  }
};

exports.updateActivity = async (req, res) => {
  let { isActive, emailId } = req.params;

  const user = await User.findOne({ where: { email: emailId } });
  try {
    console.log(req.body);
    // user.isActive = req.body.isActive;
    user.isActive = isActive === "true" ? true : false;
    const updatedUser = await user.save();
    res.status(200).send({
      message: `Updated activity status of user ${user.name}`,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Unable to update user info", errorMessage: error });
  }
};

exports.deleteUser = async (req, res) => {
  let { emailId } = req.params;

  // const user = await User.findOne({ where: { email: emailId } });
  try {
    await User.destroy({ where: { email: emailId } });
    res.status(200).send({ message: `User ${user.name} is deleted` });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in deleting user", errorMessage: error });
  }
};
