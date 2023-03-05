import styles from "../styles/userpost.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Userpost = (props) => {
  // const [likes, setLikes] = useState(0);
  return (
    <div>
      {props.posts.map((post) => {
        return (
          <div key={post._id} className={styles.posts}>
            <Link
              className={styles.userpost}
              href={{
                pathname: `/${props.userid}/single-post`,
                query: { postid: post._id },
              }}
            >
              <p className={styles.owner}>
                by {post.owner} on {post.date}
              </p>
              <p>{post.post}</p>
            </Link>
            <div className={styles.interaction}>
              <div className={styles.interactionset}>
                <div
                  // onClick={() => {
                  //   setLikes(likes + 1);
                  // }}
                  className={styles.interactionbtn}
                >
                  <FontAwesomeIcon className={styles.icon} icon={faHeart} />
                </div>
                {/* <p>{likes}</p> */}
              </div>
              <div className={styles.interactionset}>
                <div className={styles.interactionbtn}>
                  <FontAwesomeIcon icon={faComment} />
                </div>
              </div>
              <div className={styles.interactionset}>
                <div className={styles.interactionbtn}>
                  <FontAwesomeIcon icon={faRetweet} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Userpost;
