const User = require('../models/user')
const Team = require('../models/team')

const isValidEmail = (email) => {
    const re =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
  };
  
const isValidPassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };


const isUser = async (userId) => {
  const member = await User.findOne({
      where:{
          id: userId
      }
  })
  return member;
}

const isTeam = async (teamName) => {
  const team = await Team.findOne({
    where: {
      teamName: teamName
    }
  })
  return team;
}
  
module.exports = { isValidEmail, isValidPassword, isUser, isTeam};