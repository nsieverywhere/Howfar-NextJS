import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,
});

const User = models.User || model("User", userSchema);

export default User;
