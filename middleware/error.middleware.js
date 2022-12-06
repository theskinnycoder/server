const { IS_PROD } = require("../utils/constants");

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req?.originalUrl}`);
  res.status(404);
  next(error);
};

const errorCheck = (err, req, res, next) => {
  const statusCode = res?.statusCode === 200 ? 500 : res?.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: IS_PROD ? null : err?.stack,
  });
};

module.exports = { notFound, errorCheck };
