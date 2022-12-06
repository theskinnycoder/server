const {
  register,
  login,
  logout,
  me,
} = require("../controllers/auth.controllers");
const { authCheck } = require("../middleware/auth.middleware");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authCheck, me);

module.exports = router;
