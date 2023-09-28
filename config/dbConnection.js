const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) =>
      console.log(`Mongo DB connected with server: ${data.connection.host}`)
    );
};

module.exports = connectToMongo;