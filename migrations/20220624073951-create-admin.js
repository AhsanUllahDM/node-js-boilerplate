"use strict"
const { TABLES } = require("../utils/constants")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLES.ADMIN, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      isSubAdmin: {
        type: Sequelize.BOOLEAN
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  //eslint-disable-next-line
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLES.ADMIN)
  }
}
