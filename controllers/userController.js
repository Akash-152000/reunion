const User = require("../models/userModel");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const catchErrors = require("../utils/catchErrors");
const sendToken = require("../utils/sendToken");

exports.myprofile = async (req, res) => {
  try {
    let user = await User.find({ user: req.user._id });

    if (!user) {
      return catchErrors(404, "User not found", res);
    }

    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    catchAsyncErrors(error, req, res);
  }
};

exports.updateuser = async (req, res) => {
  try {
    console.log("payload",req.body.payload)
    const {name, phone, email, address} = req.body.payload
    console.log(req.body.payload)
    const newUser = {
      name: name,
      phone: phone,
      email: email,
      address: address,
    };

    const user = await User.findByIdAndUpdate(req.user._id, newUser, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch(error) {
    catchAsyncErrors(error, req, res);
  }
};

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
      return catchErrors(400, "Please provide both Email and Password!!", res);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return catchErrors(401, "Invalid Email or Password!!", res);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return catchErrors(401, "Invalid Email or Password!!", res);
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
    success: true,
    message: "logged out",
  });
};
