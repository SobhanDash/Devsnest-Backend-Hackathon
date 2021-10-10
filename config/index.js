require("dotenv").config();

module.exports = {
  sequelize_database: process.env.DATABASE,
  sequelize_username: process.env.USER,
  sequelize_password: process.env.PASSWORD,
  sequelize_host: process.env.HOST,
  app_port: process.env.PORT,
  SECRET: process.env.SECRET,
};
