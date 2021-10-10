require("dotenv").config();

module.exports = {
  sequelize_database: process.env.SEQUELIZE_DATABASE,
  sequelize_username: process.env.SEQUELIZE_USERNAME,
  sequelize_password: process.env.SEQUELIZE_PASSWORD,
  sequelize_host: process.env.SEQUELIZE_HOST,
  app_port: process.env.PORT,
  SECRET: process.env.SECRET,
};
