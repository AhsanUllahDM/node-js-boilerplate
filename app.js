const env = process.env.NODE_ENV || "development"
env != "test"
  ? require("dotenv").config()
  : require("dotenv").config({ path: "test.env" })
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
const cors = require("cors")
const fileUpload = require("express-fileupload")
var passport = require("passport")
var { getJwtStrategy } = require("./config/passport")
const database = require("./utils/database")
const globalErrorHandler = require("./middlewares/globalErrorHandler")
var app = express()
app.use(logger("dev"))
app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
database.initConnection()
app.use(cors("*"))
const router = express.Router()
const adminRoutes = require("./routes")
app.use("/api/v1/", adminRoutes(router))


passport.use(getJwtStrategy())
app.use(globalErrorHandler)

module.exports = app
