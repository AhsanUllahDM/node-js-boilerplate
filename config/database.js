const { Sequelize } = require("sequelize")
require("dotenv").config()

const { DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DIALECT } = process.env
const sequelize = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DIALECT
})

module.exports = sequelize
