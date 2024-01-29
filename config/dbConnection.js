const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) =>
        console.log(`Mongo DB connected with server: ${data.connection.host}`)
      );
  } catch (error) {
    console.log("Error in connecting to DB", error)
  }
};

module.exports = connectToMongo;
