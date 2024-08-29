const User = require("./model.user");
const bcrypt = require("bcrypt");
const userService = {};

userService.registerUser = async ({ name, email, password }) => {
  try {
    const hash = bcrypt.hashSync(password, 10);

    let newUser = await User.create({ name, email, password: hash });
    return { status: "OK", data: newUser };
  } catch (err) {
    return { status: "ERR", data: null, error: err };
  }
};

userService.getUserEmail = async (email) => {
  try {
    let user = await User.find({ email });
    return { status: "OK", data: user, error: null };
  } catch (err) {
    return { status: "ERR", data: [], error: err };
  }
};

userService.userLogin = async (email, password) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      let { password: hash } = user;
      let isMatched = bcrypt.compareSync(password, hash);
      if (isMatched) {
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

userService.getusers = async () => {
  return User.find({});
};

userService.deleteUser = async (id, updateFields) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { ...updateFields },
    { new: true }
  );
};

userService.updateuser = async (id,{ name, email}) => {
return User.findOneAndUpdate({_id:id},{name, email})
}

userService.verifyCurrentPassword = async (user, currentPassword) => {

  // Compare the current password with the stored hashed password
  return await bcrypt.compare(currentPassword, user.password);
},

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
