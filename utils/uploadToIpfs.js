require("dotenv").config()
const { create } = require("ipfs-http-client")
const { Buffer } = require("buffer")
const auth =
  "Basic " +
  Buffer.from(
    process.env.PROJECT_ID + ":" + process.env.PROJECT_SECRET
  ).toString("base64")

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth
  }
})

module.exports = {
  client
}
