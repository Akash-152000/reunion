const Property = require("../models/propertyModel");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const catchErrors = require("../utils/catchErrors");

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    catchAsyncErrors(error, req, res);
  }
};

exports.addProperty = async (req, res) => {
  console.log(req.body)
  try {
    const {
      propertyName,
      propertyDescription,
      propertyAddress,
      price,
      propertyType,
      rooms,
      toilets,
      area,
      category,
      amenities
    } = req.body;
    const property = await Property.create({
      propertyName,
      propertyDescription,
      propertyAddress,
      price,
      propertyType,
      rooms,
      toilets,
      area,
      category,
      amenities,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      property,
    });
  } catch (error) {
    catchAsyncErrors(error, req, res);
  }
};

exports.getProperty = async (req, res) => {
  try {
    console.log(req.user);
    let property = await Property.find({ user: req.user._id });

    if (!property) {
      return catchErrors(404, "Property not found", res);
    }

    return res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    catchAsyncErrors(error, req, res);
  }
};

exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return catchErrors(404, "Property not found", res);
    }

    if (!(property.user._id.toString() === req.user._id.toString())) {
      return catchErrors(401, "You are not allowed to Edit this resource", res);
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
    catchAsyncErrors(error, req, res);
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return catchErrors(404, "Property not found", res);
    }

    property.deleteOne();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    catchAsyncErrors(error, req, res);
  }
};
