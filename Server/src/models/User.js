// models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // không cho trùng email
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"], // trong CMS bạn chỉ cần 'admin'
    default: "admin",
  },
});

module.exports = mongoose.model("User", userSchema);
