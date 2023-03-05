import { useState } from "react";
import styles from "../../styles/Signup.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");

  function handler(e) {
    e.preventDefault();
    const postData = async () => {
      const data = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
      };
      const response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((response) => {
        response.json().then((data) => {
          if (data.message == "signed up") {
            setInfo("Signed Up");
            router.push("/auth/login");
          } else {
            setInfo("User already exist.");
            window.setTimeout(() => {
              setInfo("");
            }, 2000);
          }
        });
      });
    };
    postData();
  }

  return (
    <div className={`${styles.container} container-fluid`}>
      <div className={` row`}>
        <div className="col-lg-6">
          <h2>Welcome to Howfar, sign up!</h2>
        </div>
        <div className="col-lg-6">
          <h3>Signup</h3>
          <form onSubmit={handler}>
            <div className={styles.names}>
              <div
                className={`${(styles.formitems, styles.namefield)} form-group`}
              >
                <label htmlFor="firstname">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="First name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div
                className={`${(styles.formitems, styles.namefield)} form-group`}
              >
                <label htmlFor="lastname">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="Last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={`${styles.formitems} form-group`}>
              <label htmlFor="username">username </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.formitems} form-group`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.formitems} form-group`}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <small id="loginhelper" className="form-text text-muted">
              Already have an account with us?
            </small>
            <Link href="/auth/login">Login</Link>
            <br />
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
            {info}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
