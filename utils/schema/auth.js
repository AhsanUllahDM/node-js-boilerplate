const Joi = require("joi")

const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "any.required": `Email is a required field`,
    "string.empty": `Email cannont be empty`,
    "string.email": `Enter a valid email`
  }),
  password: Joi.string().required().min(8).max(16).messages({
    "any.required": `Password is a required field`,
    "string.empty": `Password can not be empty`,
    "string.min": `Password length must be at least 8 characters long`,
    "string.max": `length must be less than or equal to 16 characters long`
  })
})

const passwordChangeSchema = Joi.object({
  currentPassword: Joi.string().min(8).max(16).required().messages({
    "any.required": `Current Password is a required field`,
    "string.empty": `Current Password can not be empty`,
    "string.min": `Password length must be at least 8 characters long`,
    "string.max": `length must be less than or equal to 16 characters long`
  }),
  newPassword: Joi.string().min(8).max(16).required().messages({
    "any.required": `New Password is a required field`,
    "string.empty": `New Password can not be empty`,
    "string.min": `Password length must be at least 8 characters long`,
    "string.max": `length must be less than or equal to 16 characters long`
  })
})
const passwordResetSchema = Joi.object({
  newPassword: Joi.string().min(8).max(16).required().messages({
    "any.required": `New Password is a required field`,
    "string.empty": `New Password can not be empty`,
    "string.min": `Password length must be at least 8 characters long`,
    "string.max": `length must be less than or equal to 16 characters long`
  }),
  token: Joi.string().required().messages({
    "any.required": `token is a required field`,
    "string.empty": `token cannont be empty`
  })
})

module.exports = {
  loginSchema,
  passwordChangeSchema,
  passwordResetSchema
}
