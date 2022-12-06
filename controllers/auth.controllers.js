const asyncHandler = require("express-async-handler")
const UserModel = require("../models/User.model")
const { signToken } = require("../lib/jwt")
const { IS_PROD } = require("../utils/constants")

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  const user = await UserModel.create({
    username,
    email,
    password,
  })

  if (!user) {
    throw new Error("User not created")
  }

  const token = await signToken(user.id)

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .json({
      message: "User created successfully",
      user,
    })
})

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({ email })

  if (!user) {
    throw new Error("User not found")
  }

  const isValidPassword = await user.verifyPassword(password)

  if (!isValidPassword) {
    throw new Error("Invalid password")
  }

  const token = await signToken(user.id)

  if (!token) {
    throw new Error("Token not generated")
  }

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .json({
      message: "User logged in successfully",
      user,
    })
})

exports.me = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req?.user?.id)

  if (!user) {
    throw new Error("User not found")
  }

  res.status(200).json({
    message: "User found",
    user,
  })
})

exports.logout = asyncHandler(async (req, res) => {
  res.status(200).clearCookie("token").json({
    message: "User logged out successfully",
  })
})
