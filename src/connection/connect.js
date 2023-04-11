const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  //   timezone: process.env.APP_TIMEZONE,
  pool: {
    max: 20,
    min: 0,
    idle: 10000,
  },
  define: {
    // paranoid: true,
    // timestamps: true,
    freezeTableName: true,
  },
  //   dialectOptions: {
  //     useUTC: true,
  //     statement_timeout: 20000, // 20 second
  //   },
});

module.exports = sequelize;
