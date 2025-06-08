const User = require("../models/User");

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const findUser = async (data) => {
  const user = await User.findOne(data);
  return user;
};
module.exports = {
  createUser,
  findUser,
};
