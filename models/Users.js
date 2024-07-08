const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JWT = require('jsonwebtoken');


const User = new Schema({
    userId: { type: String, unique: true, required: true, },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String }
});
User.methods.accessToken = function () {
    return JWT.sign({
        userId: User.UserId, email: User.email ,
      }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
  };


module.exports = mongoose.model('User', User);
