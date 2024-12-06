const express = require("express");
const { signup, login, forgotPassword, resetPassword } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);
router.post('/forgot-password', forgotPassword); //expects post request with email
router.post('/reset-password/:token', resetPassword);//post request with token in the url and new password

module.exports = router;
