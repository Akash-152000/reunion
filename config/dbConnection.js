const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) =>
      console.log(`Mongo DB connected with server: ${data.connection.host}`)
    );
};

module.exports = connectToMongo;
