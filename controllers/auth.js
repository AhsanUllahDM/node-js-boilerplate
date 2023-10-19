const status = require("http-status")
const jwt = require("jsonwebtoken")
const { MESSAGES, MODELS } = require("../utils/constants")
const catchAsync = require("../utils/catchAsync")
const { APIresponse } = require("../utils/APIresponse")
const APIError = require("../utils/APIError")
const dbUtils = require("../utils/database")
const db = require("../models")
const { Op } = require("sequelize")
const {
  loginSchema,
  passwordChangeSchema,
  passwordResetSchema
} = require("../utils/schema/auth")
const { sendEmail } = require("../utils/email")

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  const loginValidation = loginSchema.validate(req.body)
  if (loginValidation.error) {
    return next(
      new APIError(loginValidation.error.details[0].message, status.BAD_REQUEST)
    )
  }
  const isExists = await dbUtils.find(MODELS.ADMIN, { where: { email: email } })
  if (!isExists) {
    return next(
      new APIError(MESSAGES.CREDENTIALS_NOT_VALID, status.BAD_REQUEST)
    )
  }
  let validatePassword = await db[MODELS.ADMIN].hashCompare(
    password,
    isExists.password
  )
  if (validatePassword) {
    const jwtToken = jwt.sign(
      {
        id: isExists.id,
        email: isExists.email
      },
      process.env.JWT_SECRET_KEY
    )
    return APIresponse(res, MESSAGES.SUCCESS_MESSAGE, {
      user: isExists,
      token: jwtToken
    })
  }
  return next(new APIError(MESSAGES.CREDENTIALS_NOT_VALID, status.BAD_REQUEST))
})

const changePassword = catchAsync(async (req, res, next) => {
  const passwordValidation = passwordChangeSchema.validate(req.body)
  const { currentPassword, newPassword } = req.body
  if (passwordValidation.error) {
    return next(
      new APIError(
        passwordValidation.error.details[0].message,
        status.BAD_REQUEST
      )
    )
  }
  const isExists = await dbUtils.find(MODELS.ADMIN, {
    where: {
      [Op.and]: {
        email: req.user.email,
        id: req.user.id
      }
    }
  })
  let validatePassword = await db[MODELS.ADMIN].hashCompare(
    currentPassword,
    isExists.password
  )
  if (!validatePassword) {
    return next(
      new APIError(MESSAGES.CREDENTIALS_NOT_VALID, status.BAD_REQUEST)
    )
  }
  await dbUtils.update(
    MODELS.ADMIN,
    {
      password: await db[MODELS.ADMIN].passwordHash(newPassword)
    },
    {
      where: {
        [Op.and]: {
          email: req.user.email,
          id: req.user.id
        }
      }
    }
  )

  return APIresponse(res, MESSAGES.PASSWORD_UPDATED_SUCCESSFUL, {
    user: isExists
  })
})

const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body

  const user = await db[MODELS.ADMIN].findOne({
    where: {
      email
    }
  })

  if (!user) {
    return next(new APIError(MESSAGES.EMAIL_NOT_FOUND, status.BAD_REQUEST))
  }
  const token = await db[MODELS.ADMIN].generateForgotPasswordToken()
  const currentDate = addMinutes(new Date(), 3)
  const userToken = await dbUtils.create(MODELS.FORGET_PASSWORD_TOKEN, {
    token: token,
    expiresIn: currentDate,
    adminId: user.id
  })
  await userToken.save()
  const sendMail = await sendEmail(
    user.email,
    MESSAGES.EMAIL_FOR_FORGET_PASSWORD_RESET,
    MESSAGES.EMAIL_CONTENT(email, token)
  )
  if (sendMail instanceof APIError) {
    return next(sendMail)
  }
  return APIresponse(res, MESSAGES.EMAIL_SUCCESSFUL, {
    email: sendMail,
    token: token
  })
})

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}

const resetPassword = catchAsync(async (req, res, next) => {
  const { newPassword, token } = req.body
  const newPasswordSchema = passwordResetSchema.validate(req.body)
  if (newPasswordSchema.error) {
    return next(
      new APIError(
        newPasswordSchema.error.details[0].message,
        status.BAD_REQUEST
      )
    )
  }
  const tokenVerify = await dbUtils.find(MODELS.FORGET_PASSWORD_TOKEN, {
    where: {
      [Op.and]: {
        token: token,
        expiresIn: {
          [Op.gte]: new Date()
        }
      }
    }
  })
  if (!tokenVerify) {
    return next(new APIError(MESSAGES.TOKEN_NOT_VALID, status.BAD_REQUEST))
  }

  tokenVerify.set({
    expiresIn: new Date()
  })
  await tokenVerify.save()
  const passwordUpdate = await dbUtils.find(MODELS.ADMIN, {
    id: tokenVerify.adminId
  })
  passwordUpdate.set({
    password: await db[MODELS.ADMIN].passwordHash(newPassword)
  })
  await passwordUpdate.save()
  return APIresponse(res, MESSAGES.PASSWORD_UPDATED_SUCCESSFUL)
})

module.exports = {
  login,
  changePassword,
  forgetPassword,
  resetPassword
}
