const {
  login,
  changePassword,
  forgetPassword,
  resetPassword
} = require("../controllers/auth")
const { authJwt } = require("../middlewares/authJwt")

module.exports = (router) => {
  router.route("/admin/login").post(login)
  router.route("/admin/passwordUpdate").put(authJwt, changePassword)
  router.route("/admin/forgetPassword").post(forgetPassword)
  router.route("/admin/resetPassword").put(resetPassword)
}
