const chai = require("./chai")

const app = require("../../app")
/**
 * @see https://github.com/chaijs/chai-http
 */

const request = chai.request(app).keepOpen()

module.exports = { request }
