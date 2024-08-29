const userService = require("./service.user");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const userController = {};

userController.registerUser = async (req, res) => {
  const { name, email, password, confirmPassword} = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  // validation of Fields
  if (!name || !email || !password || !confirmPassword) {
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

    if (!user) {
      return res.send({message:"User not found"})
    }

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

userController.getUsers = async (req, res) => {
  try {
    let getuser = await userService.getusers();
    if (!getuser.length) {
      return res.send({ status: "ERR", msg: "Users not avalable", data: null });
    }
    return res.send({ status: "OK", msg: "Get Users", data: getuser });
  } catch (err) {
    return res.send({ status: "ERR", msg: "something went wrong", data: null });
  }
};

userController.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await userService.deleteUser(id, {
      $set: { isDeleted: true },
    });
    if (deleteUser === null) {
      return res.send({
        status: "ERR",
        msg: "User Not Found",
        data: deleteUser,
      });
    }
    return res.send({
      status: "OK",
      msg: "Transaction Delete Successfulluy",
      data: deleteUser,
    });
  } catch (err) {
    console.log(err);
    return res.send({ status: "ERR", msg: "something went wrong", data: null });
  }
};

userController.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;
    // validation of Fields
    if (!name || !email ) {
      return res.send({
        status: "ERR",
        msg: "name, email, password are required",
        data: null,
      });
    }

    const updateUserOne = await userService.updateuser(id, {
      name,
      email,
      password,
    });
    return res.send({
      status: "OK",
      msg: "User Update Successfulluy",
      data: updateUserOne,
    });
  } catch (error) {
    console.log(err);
    return res.send({ status: "ERR", msg: "something went wrong", data: null });
  }
};

userController.updatepassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const { id } = req.params;
    // Validate that all password fields 
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.send({
        status: "ERR",
        msg: "Current password, new password, and confirm password are required",
        data: null,
      });
    }

    // Fetch the user from the database
    const user = await userService.getUserById(id);
 
    if (!user) {
      return res.send({
        status: "ERR",
        msg: "User not found",
        data: null,
      });
    }

     // Verify the current password with the hashed password
     const isCurrentPasswordValid = await userService.verifyCurrentPassword(user, currentPassword);
     if (!isCurrentPasswordValid) {
       return res.send({
         status: "ERR",
         msg: "Current password is incorrect",
         data: null,
       });
     }

      // Check if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      return res.send({
        status: "ERR",
        msg: "New password and confirm password do not match",
        data: null,
      });
    }


     
       // Hash the new password and update it in the database
    const updatePass = await userService.hashPassword(newPassword);
    await userService.updatePassword(id, updatePass);


    return res.send({
      status: "OK",
      msg: "Password updated successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
    return res.send({ status: "ERR", msg: "Something went wrong", data: null });
  }
}

module.exports = userController;
