import { useRouter } from "next/router";
import Link from "next/link";
import Sidebar from "../../components/sidebar";
import styles from "../../styles/dashboard.module.css";
import connectMongo from "../../utils/connectdb";
import User from "../../models/usermodel";
import fav from "../../public/profile/profile.jpg";
import Image from "next/image";
import Post from "../../models/postmodel";

const Dashboard = ({ user, postDatas }) => {
  const router = useRouter();
  const userid = router.query.userid;

  return (
    <div className={`container-fluid ${styles.container}`}>
      <div className={`row`}>
        <div className="col-lg-3">
          <Sidebar userid={userid} user={user} />
        </div>
        <div className={` col-lg-6`}>
          <div className={`${styles.postsection} row`}>
            <div className="col-lg-6">
              <Image
                className={styles.profileimage}
                src={fav}
                width="172"
                height="172"
              />
            </div>
            <div className="row">
              <div className={`${styles.content} row`}>
                <div className="">
                  <h5>
                    {user.firstname} {user.lastname}
                  </h5>
                </div>
                {postDatas.map((postData) => {
                  return (
                    <div className={styles.posts}>
                      <p>on {postData.date}</p>
                      <div className={styles.post}>{postData.post}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">Ads</div>
      </div>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = async (userid) => {
  await connectMongo();
  console.log("db connected on profile page");
  let newuser = userid.params.id;
  let userData = await User.findOne({ _id: userid.params.id });
  let postDatas = await Post.find({ ownerid: newuser });
  console.log(postDatas);

  return {
    props: {
      user: JSON.parse(JSON.stringify(userData)),
      postDatas: JSON.parse(JSON.stringify(postDatas.reverse())),
    },
  };
};
