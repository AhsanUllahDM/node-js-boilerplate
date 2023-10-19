const status = require("http-status")
const { expect } = require("../utils/chai")
const { request } = require("../utils/app")
const { AddLoginData } = require("../utils/db")
let token

describe("Admin Login", function () {
  it("only Password is passed", async () => {
    const resp = await request
      .post("/api/v1/admin/login")
      .send({ password: "Password" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("Email is a required field")
  })

  it("only Email is passed", async () => {
    const resp = await request
      .post("/api/v1/admin/login")
      .send({ email: "example@gmail.com" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("Password is a required field")
  })

  it("Email is passed with empty Password Field", async () => {
    const resp = await request
      .post("/api/v1/admin/login")
      .send({ email: "example@gmail.com", password: "" })
    expect(resp.body.data.message).to.be.equal("Password can not be empty")
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
  })

  it("Password is passed with empty Email Field", async () => {
    const resp = await request
      .post("/api/v1/admin/login")
      .send({ email: "", password: "Password" })
    expect(resp.body.data.message).to.be.equal("Email cannont be empty")
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
  })

  it("NO email No password", async () => {
    const resp = await request
      .post("/api/v1/admin/login")
      .send({ email: "", password: "" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("Email cannont be empty")
  })

  it("Wrong Password", async () => {
    const resp = await request
      .post("/api/v1/admin/login")
      .send({ email: "example@gmail.com", password: "Password@" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("Credentials not valid")
  })

  it("Worng Email", async () => {
    const resp = await request
      .post("/api/v1/admin/login")
      .send({ email: "example@gmail.com", password: "Passwor" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("Credentials not valid")
  })

  it("Should throw OK  if Email & Password is passed for login", async () => {
    await AddLoginData()
    const resp = await request
      .post("/api/v1/admin/login")
      .send({ email: "example@gmail.com", password: "Password" })
    token = resp.body.data.token
    expect(resp.statusCode).to.be.equal(status.OK)
    expect(resp.body.data.token).to.be.a("string")
    expect(resp.body.data).to.be.a("object")
    expect(resp.body.data.user).to.be.a("object")
  })
})

describe("Admin Change Password", function () {
  it("1: No token Passed", async () => {
    const resp = await request
      .put("/api/v1/admin/passwordUpdate")
      .send({ currentPassword: "current Password", newPassword: "new Password" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("Token not valid")
  })

  it("2: Token Passed, no New Password Filed", async () => {
    const resp = await request
      .put("/api/v1/admin/passwordUpdate")
      .set({ Authorization: `Bearer ${token}` })
      .send({ currentPassword: "current Password" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal(
      "New Password is a required field"
    )
  })

  it("3: Token Passed, EMPTY New Password Filed", async () => {
    const resp = await request
      .put("/api/v1/admin/passwordUpdate")
      .set({ Authorization: `Bearer ${token}` })
      .send({ currentPassword: "current Password", newPassword: "" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("New Password can not be empty")
  })

  it("4: Token Passed, MIN(8) New Password Filed", async () => {
    const resp = await request
      .put("/api/v1/admin/passwordUpdate")
      .set({ Authorization: `Bearer ${token}` })
      .send({ currentPassword: "current Password", newPassword: "new  Password" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal(
      "Password length must be at least 8 characters long"
    )
  })

  it("5: Token Passed, MAX(16) New Password Filed", async () => {
    const resp = await request
      .put("/api/v1/admin/passwordUpdate")
      .set({ Authorization: `Bearer ${token}` })
      .send({ currentPassword: "current Password", newPassword: "new Password" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal(
      "length must be less than or equal to 16 characters long"
    )
  })

  it("6: Token Passed, no CurrentPassword Filed", async () => {
    const resp = await request
      .put("/api/v1/admin/passwordUpdate")
      .set({ Authorization: `Bearer ${token}` })
      .send({ newPassword: "new Password" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal(
      "Current Password is a required field"
    )
  })

  it("7: Token Passed, EMPTY currentPassword Filed", async () => {
    const resp = await request
      .put("/api/v1/admin/passwordUpdate")
      .set({ Authorization: `Bearer ${token}` })
      .send({ currentPassword: "current Password", newPassword: "new  Password" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal(
      "Current Password can not be empty"
    )
  })

  it("8: Token Passed, MIN(8) currentPassword Filed", async () => {
    const resp = await request
      .put("/api/v1/admin/passwordUpdate")
      .set({ Authorization: `Bearer ${token}` })
      .send({ currentPassword: "your password", newPassword: "your new password" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal(
      "Password length must be at least 8 characters long"
    )
  })

  it("9: Token Passed, MAX(16) currentPassword Filed", async () => {
    const resp = await request
      .put("/api/v1/admin/passwordUpdate")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        currentPassword: "your password",
        newPassword: "your new password"
      })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal(
      "length must be less than or equal to 16 characters long"
    )
  })

  it("10: Wrong Password", async () => {
    const resp = await request
      .put("/api/v1/admin/passwordUpdate")
      .set({ Authorization: `Bearer ${token}` })
      .send({ currentPassword: "your  password", newPassword: "your new password" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("Credentials not valid")
  })

  it("11: Password Updated Successfully", async () => {
    const resp = await request
      .put("/api/v1/admin/passwordUpdate")
      .set({ Authorization: `Bearer ${token}` })
      .send({ currentPassword: "your new password", newPassword: "your new password" })
    expect(resp.statusCode).to.be.equal(status.OK)
    expect(resp.body.data).to.be.a("object")
    expect(resp.body.data.user).to.be.a("object")
  })
})

describe("Forget Password", function () {
  it("1: No email Field Passed", async () => {
    const resp = await request.post("/api/v1/admin/forgetPassword").send({})
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("Email is a required field")
  })

  it("Empty Email Field Passed ", async () => {
    const resp = await request
      .post("/api/v1/admin/forgetPassword")
      .send({ email: "" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("Email cannont be empty")
  })

  it("Wrong Email Passed", async () => {
    const resp = await request
      .post("/api/v1/admin/forgetPassword")
      .send({ email: "example@gmail.com" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("Enter a valid email")
  })

  it("Email Successful ", async () => {
    const resp = await request
      .post("/api/v1/admin/forgetPassword")
      .send({ email: "example@gmail.com" })
    expect(resp.statusCode).to.be.equal(status.OK)
    expect(resp.body.data.email).to.be.a("string")
    expect(resp.body.data.token).to.be.a("string")
    expect(resp.body.message).to.be.equal("Email sending successful")
    token = resp.body.data.token
  })
})

describe("Reset Password", function () {
  it("1: No Fields Passed", async () => {
    const resp = await request.put("/api/v1/admin/resetPassword").send({})
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal(
      "New Password is a required field"
    )
  })

  it("Empty NewPassword Field with no token field", async () => {
    const resp = await request
      .put("/api/v1/admin/resetPassword")
      .send({ newPassword: "your  password" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("token is a required field")
  })

  it("Empty token Field with no NewPassword field", async () => {
    const resp = await request
      .put("/api/v1/admin/resetPassword")
      .send({ token: "" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal(
      "New Password is a required field"
    )
  })

  it("4: Token field Passed, MIN(8) New Password Filed", async () => {
    const resp = await request
      .put("/api/v1/admin/resetPassword")
      .send({ newPassword: "your new password", token: "12345" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal(
      "Password length must be at least 8 characters long"
    )
  })

  it("5: Token filed Passed, MAX(16) New Password Filed", async () => {
    const resp = await request
      .put("/api/v1/admin/resetPassword")
      .send({ newPassword: "your password", token: "12345678" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal(
      "length must be less than or equal to 16 characters long"
    )
  })

  it("Token Not Valid", async () => {
    const resp = await request
      .put("/api/v1/admin/resetPassword")
      .send({ newPassword: "your new password", token: "12345678909876543" })
    expect(resp.statusCode).to.be.equal(status.BAD_REQUEST)
    expect(resp.body.data.message).to.be.equal("Token not valid")
  })

  it("Password Reset Successful", async () => {
    const resp = await request
      .put("/api/v1/admin/resetPassword")
      .send({ newPassword: "your  password", token: token })
    expect(resp.body.message).to.be.equal("Password updated successfully")
    expect(resp.body.success).to.be.a("boolean")
  })
})
