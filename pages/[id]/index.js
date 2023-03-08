import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Sidebar from "../../components/sidebar";
import connectMongo from "../../utils/connectdb";
import User from "../../models/usermodel";
import Intrest from "../../components/intrests";
import Userpost from "../../components/userposts";
import Post from "../../models/postmodel";
import { useState } from "react";

const Dashboard = ({ user, posts }) => {
  const router = useRouter();
  const userid = router.query.userid;
  const [post, setPost] = useState("");
  const [alert, setAlert] = useState("Post");
  const [placeholder, setPlaceholder] = useState(
    "How far, what's on your mind?"
  );

  const handler = (e) => {
    e.preventDefault();

    const postData = async () => {
      const data = {
        post: post,
        ownerid: userid,
        owner: user.username,
      };
      const response = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((response) => {
        response.json().then((data) => {});
      });
    };

    if (post == "") {
      setPlaceholder("Please create a post...");
    } else {
      postData();
      setPost("");
      setPlaceholder("How far, what's on your mind?");
      setAlert("Done :)");
      window.setTimeout(() => {
        setAlert("Post");
      }, 2000);
    }
  };

  return (
    <div className={`container-fluid ${styles.container} `}>
      <div className="row">
        <div className="col-lg-3">
          <Sidebar userid={userid} user={user} />
        </div>
        <div className={`${styles.dash} col-lg-6  `}>
          <div className={`${styles.postsection}`}>
            <form onSubmit={handler}>
              <textarea
                placeholder={placeholder}
                className={`${styles.post}`}
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
              <button
                type="submit"
                className={`${styles.postbutton} btn btn-primary`}
              >
                {alert}
              </button>
            </form>
          </div>
          <Userpost posts={posts} userid={userid} />
        </div>
        <div className="col-lg-3">
          <Intrest />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = async (userid) => {
  await connectMongo();
  console.log("db connected on profile page");

  let userData = await User.findOne({ _id: userid.params.id });
  let postData = await Post.find();

  return {
    props: {
      user: JSON.parse(JSON.stringify(userData)),
      posts: JSON.parse(JSON.stringify(postData.reverse())),
    },
  };
};
