const { Sequelize } = require("sequelize");
const {
  sequelize_database,
  sequelize_username,
  sequelize_password,
} = require("../config");

const sequelize = new Sequelize(
  sequelize_database,
  sequelize_username,
  sequelize_password,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection with DB established");
  } catch (err) {
    console.error("Unable to connect with DB");
  }
})();

// sequelize.user.hasMany(sequelize.team)
// sequelize.team.belongsTo(sequelize.user);

module.exports = sequelize;
