const mongoose = require("mongoose");

const connectMongo = async () =>
  mongoose.connect(
    "mongodb+srv://admin-nsi:a5enLo0RGTW0TKW8@cluster0.kbourxq.mongodb.net/?retryWrites=true&w=majority"
  );

export default connectMongo;

// process.env.MONGO_URI;
