import connectMongo from "../../utils/connectdb";
import Post from "../../models/postmodel";

export default async function handler(req, res) {
  await connectMongo();
  console.log("db connected");
  const { post, ownerid, owner } = JSON.parse(req.body);
  const event = new Date();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  // "en-US";
  const time = event.toLocaleTimeString();
  const date = event.toLocaleDateString(undefined, options);

  const newpost = await Post.create({ post, owner, date, time, ownerid });
  console.log(newpost);
  res.status(200).json({ message: "post created" });
}
