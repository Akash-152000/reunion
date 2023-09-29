const catchAsyncErrors = (error, req, res) => {
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Resource not found. Invalid ${error.path}`,
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: `${error.message}`,
    });
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: `Duplicate ${Object.keys(error.keyValue)} Entered`,
    });
  }

  // Wrong JWT error
  if (error.code === "JsonWebTokenError") {
    return res.status(400).json({
      success: false,
      message: "Json web token is invalid please try again",
    });
  }

  res.status(500).json({
    success: false,
    message: error.message || "Internal Server error",
  });
};

module.exports = catchAsyncErrors;
