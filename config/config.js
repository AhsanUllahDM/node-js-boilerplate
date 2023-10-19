const env = process.env.NODE_ENV || "development"
env !== "test"
  ? require("dotenv").config()
  : require("dotenv").config({ path: "test.env" })
const { DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DIALECT } = process.env

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: DB_HOST,
    dialect: DIALECT
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: DB_HOST,
    dialect: DIALECT
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: DB_HOST,
    dialect: DIALECT
  }
}
