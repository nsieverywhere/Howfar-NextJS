const mongoose = require("mongoose");

const connectMongo = async () =>
  mongoose.connect(
    "mongodb+srv://admin-nsi:q6CNybJ1n4fWjv66@cluster0.kbourxq.mongodb.net/?retryWrites=true&w=majority"
  );

export default connectMongo;

// process.env.MONGO_URI;
