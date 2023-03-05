import connectMongo from "../../utils/connectdb";
import User from "../../models/usermodel";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export default async function handler(req, res) {
  await connectMongo();
  console.log("db connected");

  const { email, password } = JSON.parse(req.body);
  User.find({ email: email }, function (err, docs) {
    if (docs[0] == undefined) {
      res.status(400).json({ message: "user does not exist" });
    } else {
      if (err) {
        console.log(err);
      } else {
        bcrypt.compare(password, docs[0].password, function (err, result) {
          if (result == true) {
            res
              .status(200)
              .json({ userid: docs[0]._id, message: "signing in" });

            // res.send([{ userid: docs[0]._id, message: "Signing in" }]);
          } else {
            res.status(400).json({ message: "password is incorrect." });
          }
        });
      }
    }
  });
}
