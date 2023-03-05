import { useState, useEffect } from "react";
import styles from "../../styles/Login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");

  function handler(e) {
    e.preventDefault();
    const loginData = async () => {
      const data = {
        email: email,
        password: password,
      };
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((response) => {
        response.json().then((data) => {
          if (data.message == "user does not exist") {
            setInfo("user does not exist");
          } else if (data.message == "password is incorrect.") {
            setInfo("password is incorrect.");
            window.setTimeout(() => {
              setInfo("");
            }, 2000);
          } else {
            setInfo("Signing in...");
            // router.push(`/dash/${data.userid}`);
            router.push({
              pathname: `/${data.userid}/`,
              query: {
                userid: data.userid,
              },
            });
          }
        });
      });
    };
    loginData();
  }

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("[id]/");
  }, []);

  return (
    <div className={`${styles.container} container-fluid`}>
      <div className={` row`}>
        <div className="col-lg-6">
          <h2>Welcome back, Login!</h2>
        </div>
        <div className="col-lg-6">
          <h3>Login</h3>
          <form onSubmit={handler}>
            <div className={`${styles.formitems} form-group`}>
              <label for="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={`${styles.formitems} form-group`}>
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <small id="loginhelper" class="form-text text-muted">
              Don't have an account?
            </small>
            <Link href="/auth/signup">Signup</Link>
            <br />
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            {info}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
