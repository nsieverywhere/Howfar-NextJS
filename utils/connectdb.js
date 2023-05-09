const mongoose = require("mongoose");

const connectMongo = async () => mongoose.connect("mongodb://127.0.0.1/Howfar");

export default connectMongo;

// process.env.MONGO_URI;
// "mongodb://127.0.0.1/Howfar"
// "mongodb+srv://admin-nsi:a5enLo0RGTW0TKW8@cluster0.kbourxq.mongodb.net/?retryWrites=true&w=majority"
