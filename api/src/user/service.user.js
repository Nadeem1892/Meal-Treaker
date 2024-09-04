const User = require("./model.user");
const bcrypt = require("bcrypt");
const userService = {};

// register user
userService.registerUser = async ({ name, email, password, age, weight, height}) => {
  return await User.create({name,email,password,age, weight, height})
};

//  check Email & Password
userService.getUserEmail = async (email) => {
  return await User.find({email})
};

// //get Users
// userService.getusers = async () => {
//   return User.find({ isDeleted: { $ne: true } });
// };

// //delete User
// userService.deleteUser = async (id, updateFields) => {
//   return User.findByIdAndUpdate(
//     { _id: id },
//     { ...updateFields },
//     { new: true }
//   );
// };

// userService.updateuser = async (id,{ name, email}) => {
// return User.findOneAndUpdate({_id:id},{name, email})
// }

userService.verifyCurrentPassword = async (user, currentPassword) => {

  // Compare the current password with the stored hashed password
  return await bcrypt.compare(currentPassword, user.password);
},
//get user by id 
userService.getUserById = async (id) => {
  // Fetch the user by ID from the database
  return await User.findById(id);
},

userService.hashPassword = async (password)=> {
  // Hash the new password
  return await bcrypt.hash(password, 10);
},

userService.updatePassword = async (id, updatePass) => {
  return await User.findByIdAndUpdate(id,{password:updatePass},{new:true});
}




module.exports = userService;
