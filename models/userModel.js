const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new  mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [30, "Name cannot be more than 30 characters"],
    minLength: [3, "Name cannot be less than 3 characters"],
  },
  phone:{
    type:String,
    required:[true, "Phone number is required"],
    maxLength:[10,"Phone number cannot be more than 10 characters"],
    minLength:[10,"Phone number cannot be less than 10 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Enter a valid Email"],
  },
  address:{
    type:String,
    required:[true,"Please enter your address"],
    maxLength:[200,"Address cannot be more than 200 characters"],
    minLength:[10,"Address cannot be less than 20 characters"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password cannot be less than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
});

userSchema.pre('save',async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password,10)
});

userSchema.methods.getJWTToken = function(){

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("User", userSchema);
