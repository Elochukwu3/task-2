const express = require('express');
const {registerUser,  userLogin} = require('../controllers/userAuthController')
const router = express.Router();

// [POST] /auth/register
// [POST] /auth/login
router.route('/register').post(registerUser);
router.route('/login').post(userLogin);

