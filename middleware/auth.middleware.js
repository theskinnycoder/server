const asyncHandler = require("express-async-handler");
const { verifyToken } = require("../lib/jwt");
const UserModel = require("../models/User.model");

const authCheck = asyncHandler(async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      throw new Error("UnAuthenticated");
    }
    const decoded = await verifyToken(token ?? "");

    const user = await UserModel.findById(decoded?.id ?? "");

    if (!decoded || !user) {
      throw new Error("UnAuthorized");
    }
    req.user = user;
  } catch (error) {
    throw new Error("UnAuthenticated");
  } finally {
    next();
  }
});

module.exports = { authCheck };
