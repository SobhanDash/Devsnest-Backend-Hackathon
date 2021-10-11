const { Sequelize } = require("sequelize");
//for localhost:
// const {
//   sequelize_database,
//   sequelize_username,
//   sequelize_password,
//   sequelize_host,
//   sequelize_dialect,
// } = require("../config");

const sequelize = new Sequelize(
  //production:
  process.env.DATABASE_URL,
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
  //localhost:
  // sequelize_database,
  // sequelize_username,
  // sequelize_password,
  // {
  //   host: sequelize_host,
  //   dialect: sequelize_dialect,
  // }
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log(`DB ${process.env.DATABASE_NAME}, CONNECTED SUCCESSFULLY`);
    // console.log("Connection with DB established");
  } catch (err) {
    console.error("Unable to connect with DB");
  }
})();

// sequelize.user.hasMany(sequelize.team)
// sequelize.team.belongsTo(sequelize.user);

module.exports = sequelize;
