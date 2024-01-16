const catchAsyncErrors = require("../utils/catchAsyncErrors");
const catchErrors = require("../utils/catchErrors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log('token',token);

    if (!token) {
      return catchErrors(401, "Please login!!", res);
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    catchAsyncErrors(error, req, res);
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        catchErrors(
          403,
          `Role: ${req.user.role} is not authorized to access this resource`,
          res
        )
      );
    }

    next();
  };
};
