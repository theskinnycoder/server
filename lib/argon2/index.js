const { hash, verify } = require("argon2");

async function hashPassword(plainPassword) {
  return hash(plainPassword);
}

async function verifyPassword(plainPassword, hashedPassword) {
  return verify(hashedPassword, plainPassword);
}

module.exports = {
  hashPassword,
  verifyPassword,
};
