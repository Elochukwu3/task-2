const express = require("express");
const {
  userRegister,
  userLogin,
} = require("../controllers/userAuthController");
const router = express.Router();

// [POST] /auth/register
// [POST] /auth/login
router.route('/register').post(userRegister);
router.route('/login').post(userLogin)

module.exports = router;
