import { useRouter } from "next/router";
import styles from "../styles/sidebar.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faBars,
  faXmark,
  faUser,
  faGear,
  faArrowRightFromBracket,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = (props) => {
  const router = useRouter();
  const userid = props.userid;

  return (
    <div className={styles.container}>
      <FontAwesomeIcon className={styles.bars} icon={faXmark} />

      <h5 className={styles.welcome}>Welcome {props.user.firstname}, </h5>

      <div className={styles.nav}>
        <Link
          className={styles.links}
          href={{
            pathname: `/${userid}/`,
            query: {
              userid: userid,
            },
            as: "/user/",
          }}
        >
          <FontAwesomeIcon icon={faHouseChimney} />
          <div>Home</div>
        </Link>
      </div>
      <div className={styles.nav}>
        <Link
          className={styles.links}
          href={{
            pathname: `/${userid}/dashboard`,
            query: {
              userid: userid,
            },
            as: "/user/dashboard",
          }}
        >
          <FontAwesomeIcon icon={faUser} />
          <div>Dashboard</div>
        </Link>
      </div>
      <div className={styles.nav}>
        <Link
          className={styles.links}
          href={{
            pathname: `/${userid}/settings`,
            query: {
              userid: userid,
            },
            as: "/user/settings",
          }}
        >
          <FontAwesomeIcon icon={faGear} />
          <div>Settings</div>
        </Link>
      </div>
      <br />

      <button
        className={`${styles.signout} btn btn-primary`}
        type="button"
        onClick={() => router.push("/auth/login")}
      >
        <p> Sign out</p>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
    </div>
  );
};

export default Sidebar;
