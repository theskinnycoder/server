const { sign, verify } = require("jsonwebtoken");
const { JWT_SECRET } = require("../../utils/constants");

async function signToken(payload) {
  return new Promise((resolve, reject) => {
    sign({ id: payload }, JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}

async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

module.exports = {
  signToken,
  verifyToken,
};
