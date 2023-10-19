require("dotenv").config()
const { MESSAGES } = require("../utils/constants")
const util = require("util")
const exec = util.promisify(require("child_process").exec)

async function migrate(DB_NAME, HOST_NAME, USER_NAME, PASSWORD) {
  const { stdout, stderr } = await exec(
    `npx sequelize-cli db:seed:all --url 'postgres://${USER_NAME}:${PASSWORD}@${HOST_NAME}/${DB_NAME}'`
  )
  console.log("stdout:", stdout)
  console.log("stderr:", stderr)
}

const seedall = async () => {
  try {
    const { DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env
    await migrate(DATABASE, DB_HOST, DB_USERNAME, DB_PASSWORD)
  } catch (error) {
    console.log(MESSAGES.MIGRATION_ERROR, error)
  }
}

seedall()
