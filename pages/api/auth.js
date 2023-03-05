import connectMongo from "../../utils/connectdb";
import User from "../../models/usermodel";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      // RESPONSE
      res.send("The How far server");

      break;
    case "POST":
      const { firstname, lastname, username, email, password } = JSON.parse(
        req.body
      );

      await connectMongo(); // because we are creating a new doc, we have to await the database
      console.log("db connected");

      User.find({ email: email }, function (err, docs) {
        if (docs[0] == undefined) {
          bcrypt.hash(password, saltRounds, function (err, hash) {
            const user = User.create({
              firstname,
              lastname,
              username,
              email,
              password: hash,
            });
          });

          res.status(200).json({ message: "signed up" });
          console.log("User created");
        } else {
          console.log("User already exist, sign in");
          res.status(400).json({ message: "user exist" });
        }
      });

      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
