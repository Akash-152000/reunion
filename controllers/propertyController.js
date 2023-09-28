const Property = require("../models/property");

exports.getAllProperties = async (req, res, next) => {
  const properties = await Property.find();

  if (!properties) {
    return next(new Errhandler("Errrrrr", 500));
  }

  res.status(200).json({
    success: true,
    properties,
  });
};

exports.addProperty = async (req, res, next) => {
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
