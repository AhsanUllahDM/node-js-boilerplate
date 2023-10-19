"use strict"
const { Model } = require("sequelize")
const { MODELS } = require("../utils/constants")

module.exports = (sequelize, DataTypes) => {
  class ForgetPasswordToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //eslint-disable-next-line
    static associate(models) {
      this.belongsTo(models[MODELS.ADMIN], {
        onDelete: "cascade",
        onUpdate: "cascade",
        foreignKey: "adminId"
      })
      // define association here
    }
  }
  ForgetPasswordToken.init(
    {
      token: DataTypes.STRING,
      expiresIn: DataTypes.DATE
    },
    {
      sequelize,
      modelName: MODELS.FORGET_PASSWORD_TOKEN
    }
  )
  return ForgetPasswordToken
}
