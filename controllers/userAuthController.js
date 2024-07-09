const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/Users");
const Organisation = require("../models/Orgs");
const {validateUser, validateLogin} = require("../helper/validation");


async function userRegister(req, res) {
  const { firstName, lastName, email, password, phone } = req.body;
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(422).send({
      errors: error.details.map(err => ({
        field: err.context.key,
        message: err.message
      }))
    });
  }

  try {
    const existingUser = await User.findOne({email})
    if (existingUser) {
      return res.status(400).json({
        errors: [
          {
            field: "email",
            message: "Email already exists",
          },
        ],
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    
    const newUser = await User.create({
      userId: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });
  
    await Organisation.create({
      orgId: new mongoose.Types.ObjectId(),
      name: `${firstName}'s Organisation`,
      users: [newUser.userId],
    });

    const token = newUser.accessToken();
    const {__v, _id, password:pwd, ...remDetails} = newUser._doc;
    return res.status(201).json({
        status: 'success',
        message: 'Registration successful',
        data: {
            accessToken: token,
            user: {...remDetails} ,
        }
    });
  } catch (error) {
    return res.status(400).json({ status: 'Bad request', message: 'Registration unsuccessful', statusCode: 400 });
  }
}

async function userLogin(req, res)  {
    const { email, password } = req.body;
    const { error } = validateLogin(req.body);

    if (error) {
      return res.status(422).send({
        errors: error.details.map(err => ({
          field: err.context.key,
          message: err.message
        }))
      });
    }
  
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ status: 'Bad request', message: 'Authentication failed', statusCode: 401 });
        }

        const token = user.accessToken();

        res.status(200).send({
            status: 'success',
            message: 'Login successful',
            data: {
                accessToken: token,
                user: { userId: user.userId, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone }
            }
        });
    } catch (error) {

    res.status(400).send({ status: 'Bad request', message: 'Authentication failed', statusCode: 401 });
    }
}

module.exports = {
  userRegister,
  userLogin,
};
