"use strict"

const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const basename = path.basename(__filename)
const db = {}
const env = process.env.NODE_ENV || "development"
env != "test"
  ? require("dotenv").config()
  : require("dotenv").config({ path: "test.env" })
const { DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DIALECT } = process.env
let sequelize = new Sequelize({
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DATABASE,
  host: DB_HOST,
  dialect: DIALECT
})

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
