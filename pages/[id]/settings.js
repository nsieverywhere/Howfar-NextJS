import { useRouter } from "next/router";
import Link from "next/link";
import Sidebar from "../../components/sidebar";
import styles from "../../styles/profile.module.css";
import connectMongo from "../../utils/connectdb";
import User from "../../models/usermodel";

const Settings = ({ user }) => {
  const router = useRouter();
  const userid = router.query.userid;

  return (
    <div className={`container-fluid ${styles.container}`}>
      <div className={`row`}>
        <div className="col-lg-3">
          <Sidebar userid={userid} user={user} />
        </div>
        <div className={`${styles.profilesection} col-lg-6`}>
          <h2>Settings</h2>
          <br />
          <div className="row">
            <div className={`${styles.details} col-lg-6`}>
              <h6>First Name:</h6>
              <p>{user.firstname}</p>
            </div>
            <div className={`${styles.details} col-lg-6`}>
              <h6>Last Name:</h6>
              <p>{user.lastname}</p>
            </div>
            <div className={`${styles.details} col-lg-6`}>
              <h6>username:</h6>
              <p>{user.username}</p>
            </div>
            <div className={`${styles.details} col-lg-6`}>
              <h6>Email:</h6>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3">Ads</div>
      </div>
    </div>
  );
};

export default Settings;

export const getServerSideProps = async (userid) => {
  await connectMongo();
  console.log("db connected on profile page");
  let newuser = userid.params.id;

  let userData = await User.findOne({ _id: userid.params.id });
  return {
    props: {
      user: JSON.parse(JSON.stringify(userData)),
    },
  };
};
