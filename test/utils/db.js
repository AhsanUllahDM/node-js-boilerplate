const db = require("../../models/index")
const { MODELS } = require("../../utils/constants")
const bcrypt = require("bcrypt")

const cleanUpDatabase = async () => await db.sequelize.sync({ force: true })

const AddLoginData = async () => {
  return await db[MODELS.ADMIN].create({
    email: "abdullahzafar17@gmail.com",
    password: await bcrypt.hash("Password@1", 8),
    isSubAdmin: false,
    isActive: true
  })
}

module.exports = {
  cleanUpDatabase,
  AddLoginData
}
