"use strict"
require("dotenv").config()
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const { Model } = require("sequelize")
const { MODELS } = require("../utils/constants")
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    //eslint-disable-next-line
    static associate(models) {
      this.hasOne(models[MODELS.FORGET_PASSWORD_TOKEN], {
        foreignKey: "adminId"
      })
    }

    static async hashCompare(pass, dbpassword) {
      const unhash = bcrypt.compareSync(pass, dbpassword)
      return unhash
    }

    static async passwordHash(pass) {
      const hash = bcrypt.hash(pass, 8)
      return hash
    }

    static async generateForgotPasswordToken() {
      return crypto.randomBytes(16).toString("hex")
    }
  }

  Admin.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isSubAdmin: DataTypes.BOOLEAN,
      isActive: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: MODELS.ADMIN
    }
  )
  return Admin
}
