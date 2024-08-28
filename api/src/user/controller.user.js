const userService = require("./service.user");
const User = require("./model.user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userController = {};

userController.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // validation of Fields
  if (!name || !email || !password) {
    return res.send({
      status: "ERR",
      msg: "name, email, password are required",
      data: null,
    });
  }

  //Check user
  const { data } = await userService.getUserEmail(email);
  if (data.length) {
    return res.send({ status: "ERR", msg: "Email Already Exists", data: null });
  }
  //User Register
  try {
    let newUser = await userService.registerUser({ name, email, password });
    if (newUser.status != "OK") {
      return res.send({
        status: "ERR",
        msg: "something went wrong",
        data: null,
      });
    }
    return res.send({
      status: "OK",
      msg: "User Register Successfully",
      data: newUser.data,
    });
  } catch (err) {
    return res.send({ status: "ERR", msg: "something went wrong", data: null });
  }
};

userController.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        status: "ERR",
        message: "Email or Password are required",
        data: null,
      });
    }
    let user = await userService.userLogin(email, password);
    if (user) {
      var token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      return res.send({
        status: "OK",
        message: "login successfully",
        data: {
          token: token,
          userId: user._id,
          name: user.name,
          email: user.email,
        },
        code: "OK",
        issue: null,
      });
    } else {
      return res.send({
        status: false,
        message: "Login failed",
        code: "ERROR",
        issue: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.send(error);
  }
};

module.exports = userController;
