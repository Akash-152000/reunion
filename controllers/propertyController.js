const Property = require("../models/propertyModel");
const catchAsyncErrors = require('../utils/catchAsyncErrors')

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    catchAsyncErrors(error,req,res)
  }
};

exports.addProperty = async (req, res) => {
  try {
    const { propertyName, propertyAddress, rooms, toilets, area } = req.body;
    const property = await Property.create({
      propertyName,
      propertyAddress,
      rooms,
      toilets,
      area,
    });

    res.status(201).json({
      success: true,
      property,
    });
  } catch (error) {
    console.log("debug",error.name);
    catchAsyncErrors(error,req,res)
  }
};

exports.getProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "property not found",
      });
    }

    return res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    catchAsyncErrors(error,req,res)
    
  }
};

exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "property not found",
      });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    catchAsyncErrors(error,req,res)
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "property not found",
      });
    }

    property.deleteOne();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    catchAsyncErrors(error,req,res)

  }
};
