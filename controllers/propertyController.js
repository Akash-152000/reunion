const Property = require("../models/property");

exports.getAllProperties = async (req, res) => {
  const properties = await Property.find();

  res.status(200).json({
    success: true,
    properties,
  });
};

exports.addProperty = async (req, res) => {
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
};

exports.getProperty = async (req, res) => {
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
};

exports.updateProperty = async (req, res) => {
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
};

exports.deleteProperty = async (req, res) => {
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
};
