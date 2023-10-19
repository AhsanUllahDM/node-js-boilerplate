"use strict"
const bcrypt = require("bcrypt")
const { TABLES } = require("../utils/constants")

module.exports = {
  //eslint-disable-next-line
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(TABLES.ADMIN, [
      {
        email: "talha@gmail.com",
        password: await bcrypt.hash("Password@1", 8),
        isSubAdmin: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  //eslint-disable-next-line
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLES.ADMIN, null, {})
  }
}
