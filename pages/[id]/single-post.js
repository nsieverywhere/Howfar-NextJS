import Intrest from "../../components/intrests";
import Sidebar from "../../components/sidebar";
import connectMongo from "../../utils/connectdb";
import User from "../../models/usermodel";
import styles from "../../styles/single.module.css";
import Post from "../../models/postmodel";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";

const Singlepost = (props) => {
  const router = useRouter();

  return (
    <div className={`container-fluid ${styles.container} `}>
      <div className="row">
        <div className="col-lg-3">
          <Sidebar userid={props.user._id} user={props.user} />
        </div>
        <div className={`${styles.dash} col-lg-6  `}>
          <div className={`${styles.single}`}>
            <div
              onClick={() => {
                router.back();
              }}
              className={`${styles.backbutton}`}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>

            <h6>
              @{props.postData.owner} on {props.postData.date}
            </h6>

            <div>{props.postData.post}</div>
            <div className={styles.interaction}>
              <div className={styles.interactionbtn}>
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className={styles.interactionbtn}>
                <FontAwesomeIcon icon={faComment} />
              </div>
              <div className={styles.interactionbtn}>
                <FontAwesomeIcon icon={faRetweet} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <Intrest />
        </div>
      </div>
    </div>
  );
};

export default Singlepost;

export const getServerSideProps = async (context) => {
  await connectMongo();
  let userid = context.query.id;
  let postid = context.query.postid;

  let userData = await User.findOne({ _id: userid });
  let postData = await Post.findOne({ _id: postid });

  return {
    props: {
      postData: JSON.parse(JSON.stringify(postData)),
      user: JSON.parse(JSON.stringify(userData)),
    },
  };
};
