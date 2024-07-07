const User = require("../models/Users");
const Organisation = require("../models/Orgs");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

async function userRegister(req, res) {
  const { firstName, lastName, email, password, phone } = req.body;
  if (!firstName || !lastName || !email || !password || !phone) {
    x``;
    return res.status(422).send({
      errors: [
        {
          field: "string",
          message: "All fields are required",
        },
      ],
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
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
      users: [newUser._id],
    });

    const token = newUser.accesstoken();

    res.status(201).send({
        status: 'success',
        message: 'Registration successful',
        data: {
            accessToken: token,
            user: { userId: user.userId, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone }
        }
    });
  } catch (error) {
    res.status(400).send({ status: 'Bad request', message: 'Registration unsuccessful', statusCode: 400 });
  }
}

async function userLogin(req, res)  {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ errors: [{ field: 'fields', message: 'All fields are required' }] });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ status: 'Bad request', message: 'Authentication failed', statusCode: 401 });
        }

        const token = user.accesstoken();

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
