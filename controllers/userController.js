const User = require("../models/userModel");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const catchErrors = require("../utils/catchErrors");
const sendToken = require('../utils/sendToken')

exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);

    sendToken(user, 201, res);
  } catch (error) {
    catchAsyncErrors(error, req, res);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      catchErrors(400, "Please provide both Email and Password!!", res);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      catchErrors(401, "Invalid Email or Password!!", res);
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        catchErrors(401, "Invalid Email or Password!!", res);
    }
    sendToken(user, 200, res);

  } catch (error) {
    catchAsyncErrors(error, req, res);
  }
};

exports.logout = async (req, res) => {
  await res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success:true,
    message:"logged out"
  })
};
