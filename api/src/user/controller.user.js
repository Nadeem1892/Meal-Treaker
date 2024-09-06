const userService = require("./service.user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userController = {};

userController.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      weight,
      height,
    } = req.body;

    //Check user
    const data = await userService.getUserEmail(email);
    
    if (data.length) {
      return res.send({
        status: "ERR",
        msg: "Email Already Exists",
        data: data[0]?.email,
      });
    }
    //User Register
    const hash = bcrypt.hashSync(password, 10);
    let newUser = await userService.registerUser({
      name,
      email,
      password: hash,
      age,
      weight,
      height,
    });
    
    var token = jwt.sign({ _id: newUser._id, username: newUser.name }, process.env.TOKEN_SECRET);
    return res.send({
      status: "OK",
      msg: "User Register Successfully",
      data: {
        _id: newUser._id,
        token, 
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
        weight: newUser.weight,
        height: newUser.height,
      },
    });
  } catch (err) {
    return res.send({ status: "ERR", msg: "something went wrong", data: null });
  }
};

userController.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userService.getUserEmail(email);

    if (user.length && user[0]?.email === email) {
      if (user[0]?.isDeleted) {
        return res.send({
          status: "ERR",
          message: "User account is deleted or deactivated.",
          data: null,
        });
      }
      let { password: hash } = user[0];
      let isMatched = bcrypt.compareSync(password, hash);

      if (isMatched) {
        var token = jwt.sign({ _id: user[0]?._id, username: user[0]?.name }, process.env.TOKEN_SECRET);

        return res.send({
          status: "OK",
          message: "login successfully",
          data: {
            token: token,
            userId: user[0]?._id,
            name: user[0]?.name,
            email: user[0]?.email,
            age: user[0]?.age,
            weight: user[0]?.weight,
            height: user[0]?.height,
            goal: user[0]?.goal,
          },

          code: "OK",
          issue: null,
        });
      } else {
        return res.send({
          status: false,
          message: "Invalid  password",
          code: "ERROR",
          issue: "Login failed",
        });
      }
    } else {
      return res.send({ message: "User not found or Email mismatch" });
    }
  } catch (error) {
    return res.send({ message: "Somthing want wrong", Error: error });
  }
};

// userController.getUsers = async (req, res) => {
//   try {
//     let getuser = await userService.getusers();
   
//     if (!getuser.length) {
//       return res.send({ status: "ERR", msg: "Users not avalable", data: null });
//     }
//     // if (getuser) {
      
//     // }
//     return res.send({ status: "OK", msg: "Get Users", data: getuser });
//   } catch (err) {
//     return res.send({ status: "ERR", msg: "something went wrong", data: null });
//   }
// };

// userController.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // Find the user by ID
//     const existingUser = await userService.getUserById(id);
//     // const deleteUser = await userService.deleteUser(id, {
//     //   $set: { isDeleted: true },
//     // });
//     // const existingUser = await userService.findUserById(id);

//     if (!existingUser) {
//       return res.send({
//         msg: "User not found.",
//         data: null,
//       });
//     }

//     if (existingUser?.isDeleted) {
//       // If the user is already marked as deleted
//       return res.send({
//         status: "OK",
//         msg: "This user was already deleted.",
//         data: existingUser._id,
//       });
//     }
//     const deleteUser = await userService.deleteUser(id, {
//       $set: { isDeleted: true },
//     });

//     if (deleteUser.isDeleted) {
//       // User was just marked as deleted
//       return res.send({
//         status: "OK",
//         msg: "User successfully deleted.",
//         data: deleteUser._id,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.send({
//       status: "ERR",
//       msg: "Something went wrong",
//       data: null,
//     });
//   }
// };

//  userController.updateUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const { id } = req.params;
//     // validation of Fields
//     if (!name || !email) {
//       return res.send({
//         status: "ERR",
//         msg: "name, email are required",
//         data: null,
//       });
//     }

//     const updateUserOne = await userService.updateuser(id, {
//       name,
//       email,
//     });
//     if (!updateUserOne) {
//       return res.send({
//         status: "OK",
//         msg: "User does not exist",
//         data: updateUserOne,
//       });
//     }

    
//     return res.send({
//       status: "OK",
//       msg: "User Update Successfulluy",
//       data: updateUserOne,
//     });
//   } catch (error) {
//     console.log(err);
//     return res.send({ status: "ERR", msg: "something went wrong", data: null });
//   }
// };

userController.updatepassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const { id } = req.params;

    // Ensure the ID in the token matches the ID in the request
    if (req._id !== id) {
      console.log(req?._id, "req");
      console.log(id, "params");
      return res.send({
        status: "ERR",
        msg: "You are not authorized to update this user's password",
        data: null,
      });
    }

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
    const isCurrentPasswordValid = await userService.verifyCurrentPassword(
      user,
      currentPassword
    );
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
    });
  } catch (error) {
    console.log(error);
    return res.send({ status: "ERR", msg: "Something went wrong", data: null });
  }
};

module.exports = userController;
