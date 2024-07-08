const mongoose = require("mongoose");
const Organisation = require("../models/Orgs");
const User = require("../models/Users");

async function getOrganisation(req, res) {
  try {
    const organisations = await Organisation.find({ users: req.user.userId });
    res.status(200).send({
      status: "success",
      message: "Organisations fetched successfully",
      data: { organisations },
    });
  } catch (error) {
    res
      .status(400)
      .send({
        status: "Bad request",
        message: "Failed to fetch organisations",
        statusCode: 400,
      });
  }
}

async function getOrgId(req, res) {
  try {
    const organisation = await Organisation.findOne({
      orgId: req.params.orgId,
      users: req.user.userId,
    });
    if (!organisation) {
      return res
        .status(404)
        .send({
          status: "Not Found",
          message: "Organisation not found",
          statusCode: 404,
        });
    }
    res.status(200).send({
      status: "success",
      message: "Organisation fetched successfully",
      data: organisation,
    });
  } catch (error) {
    res
      .status(400)
      .send({
        status: "Bad request",
        message: "Failed to fetch organisation",
        statusCode: 400,
      });
  }
}

async function postOrg(req, res) {
  const { name, description } = req.body;
  if (!name) {
    return res
      .status(422)
      .send({ errors: [{ field: "name", message: "Name is required" }] });
  }
  try {
    const organisation = new Organisation({
      orgId: new mongoose.Types.ObjectId(),
      name,
      description,
      users: [req.user.userId],
    });
    await organisation.save();
    res.status(201).send({
      status: "success",
      message: "Organisation created successfully",
      data: organisation,
    });
  } catch (error) {
    res
      .status(400)
      .send({
        status: "Bad request",
        message: "Client error",
        statusCode: 400,
      });
  }
}

async function orgUsers(req, res) {
  const { userId } = req.body;
  if (!userId) {
    return res
      .status(422)
      .send({ errors: [{ field: "userId", message: "User ID is required" }] });
  }
  try {
    const organisation = await Organisation.findOne({
      orgId: req.params.orgId,
      users: req.user.userId,
    });
    if (!organisation) {
      return res
        .status(404)
        .send({
          status: "Not Found",
          message: "Organisation not found",
          statusCode: 404,
        });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res
        .status(404)
        .send({
          status: "Not Found",
          message: "User not found",
          statusCode: 404,
        });
    }

    organisation.users.push(user._id);
    await organisation.save();
    res.status(200).send({
      status: "success",
      message: "User added to organisation successfully",
    });
  } catch (error) {
    res
      .status(400)
      .send({
        status: "Bad request",
        message: "Failed to add user to organisation",
        statusCode: 400,
      });
  }
}

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
      const user = await User.findOne({userId});

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
      
        const requestingUserId = req.user.userId;
        console.log(requestingUserId, req.user);

        if (user.userId === requestingUserId) {
            return res.status(200).json({
                status: 'success',
                message: 'User details retrieved successfully',
                data: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            });
        }

      
        const organisations = await Organisation.find({ users: requestingUserId });

        const userInOrganisation = organisations.some(org => org.users.includes(user._id.toString()));

        if (userInOrganisation) {

            return res.status(200).json({
                status: 'success',
                message: 'User details successfully retrieved',
                data: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            });
        }

        return res.status(403).json({ message: 'Access denied' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
};


module.exports = { getOrganisation, getOrgId, postOrg, orgUsers, getUserById };
