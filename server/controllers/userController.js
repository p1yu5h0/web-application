// const { User } = require("../db");
const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { JWT_SECRET } = require("../config");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const hiController = (req, res) => {
  res.json({ msg: "Hi piyush, backend is good" });
};

const signUpBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signUpController = async (req, resp) => {
  const { success } = signUpBody.safeParse(req.body);

  if (!success) {
    return resp.status(411).json({
      msg: "email already taken/ incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return resp.status(411).json({
      msg: "email already taken/ incorrect inputs",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  const token = jwt.sign({ userId }, "piyush");

  resp.json({
    message: "User created successfully",
    token: token,
  });
};

const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const signInController = async (req, resp) => {
  const { success } = signInBody.safeParse(req.body);

  if (!success) {
    resp.status(411).json({
      msg: "email already taken/ incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (user) {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, "piyush");
      resp.json({
        msg: "user signed in",
        token: token,
      });
      return;
    } else {
      return resp.status(403).json({
        msg: "wrong password",
      });
    }
  }

  resp.status(411).json({
    message: "Error while logging in",
  });
};

const getDataController = async function (req, resp) {
  var user = await User.findById(req.userId);
  resp.json({
    userdetails: {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      image: "/",
    },
  });
};

const signOutController = (req, resp) => {
  localStorage.removeItem("token");
  resp
    .json({
      message: "User signed out successfully",
    })
    .redirect("/");
};

const resetPasswordController = async (req, resp) => {
  const username = req.body.username;
  try {
    const oldUser = await User.findOne({ username: username });
    if (!oldUser) {
      return resp.json({
        message: "User don't exist",
      });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign(
      {
        username: oldUser.username,
        id: oldUser._id,
      },
      secret
    );
    const link = `http://localhost:3000/app/v1/user/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.MY_EMAIL,
      to: "piyush200205@gmail.com",
      subject: "Password Reset",
      text: link,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    resp.json({
      link: link,
    });
  } catch (err) {}
};

const getResetPasswordController = async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await User.findById(id);
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { username: verify.username, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
};

const postResetPasswordController = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const p1 = req.body.password;

  User.findById(id)
    .then((oldUser) => {
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = JWT_SECRET + oldUser.password;
      return jwt.verify(token, secret);
    })
    .then(async (verify) => {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      return User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
    })
    .then((status) => {
      res.json({ message: "user pass updated", status: status });
    })
    .catch((err) => {
      res.json({ status: "Something Went Wrong" });
    });
};

const getAllUsersController = async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserController = async (req, res) => {
  const { userid } = req.body;
  try {
    User.findOneAndDelete({ _id: userid });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hiController,
  signUpController,
  signInController,
  getDataController,
  signOutController,
  resetPasswordController,
  getResetPasswordController,
  postResetPasswordController,
  getAllUsersController,
  deleteUserController,
};
