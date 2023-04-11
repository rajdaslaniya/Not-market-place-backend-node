const express = require("express");
const router = express.Router();
const {
  login,
  signUp,
  emailVerify,
  forgotPassword,
  changePassword,
} = require("../controller/authController");
const {
  loginValidate,
  signUpValidate,
  userAuthenticate,
} = require("../middleware/middleware");

router.post("/login", loginValidate, login);
router.post("/sign-up", signUpValidate, signUp);
router.get("/email-verified/:id", emailVerify);
router.put("/forgot-password", forgotPassword);
router.post("/change-password", userAuthenticate, changePassword);

module.exports = router;
