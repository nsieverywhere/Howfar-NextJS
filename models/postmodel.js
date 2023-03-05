import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  post: String,
  date: String,
  ownerid: String,
  time: String,
  owner: String,
});

const Post = models.Posts || model("Posts", postSchema);

export default Post;
