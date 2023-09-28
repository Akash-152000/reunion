const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [30, "Name cannot be more than 30 characters"],
    minLength: [3, "Name cannot be less than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password cannot be less than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "owner", "admin"],
    default: "user",
  },
});

module.export = mongoose.model("User", userSchema);
