"use strict"
const { TABLES } = require("../utils/constants")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLES.FORGET_PASSWORD_TOKEN, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
      },
      expiresIn: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      adminId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: TABLES.ADMIN
          },
          key: "id"
        },
        allowNull: false
      }
    })
  },
  //eslint-disable-next-line
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLES.FORGET_PASSWORD_TOKEN)
  }
}
