const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: [true, "Please enter property Name"],
  },
  propertyAddress: {
    type: String,
    required: [true, "Please enter property Address"],
  },
  city: {
    type: String,
    required: [true, "Please enter the City"],
  },
  state: {
    type: String,
    required: [true, "Please enter the State"],
  },
  availableFrom: {
    type: Date,
    required: [true, "Please Enter the Date"],
    default: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  },
  price: {
    type: Number,
    required: [true, "Please enter Price"],
    minLength: [3, "Price cannot be less than 3 characters"],
  },
  propertyType: {
    type: String,
    required: [true, "Please enter Property type"],
  },
  rooms: {
    type: Number,
    required: [true, "Please enter No.of Rooms"],
    maxLength: [2, "Cannot exceed two characters"],
  },
  toilets: {
    type: Number,
    required: [true, "Please enter No.of Toilets"],
    maxLength: [2, "Cannot exceed two characters"],
  },
  area: {
    type: String,
    required: [true, "Please enter No.of Toilets"],
    default: "5x7m2",
  },
  images: {
    type: String,
    default: "/images/default_property.jpg",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", propertySchema);
