const Sequelize = require("sequelize");

const sequelize = new Sequelize.Sequelize("learn-node", "root", "admin", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
