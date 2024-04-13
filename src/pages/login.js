import { useRef } from "react";

// react router
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";

// custom context hook (authentication)
import { useAuthValue } from "../authContext";

function Login() {
  const { signIn } = useAuthValue();

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    // storing user's data
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // sign in user
    const status = await signIn(data);
    // if user signed in redirect to corresponding page

    status ? navigate("/") : navigate("/login");
  }

  return (
    <div className={styles.loginForm}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2>LogIn</h2>
        <input
          type="text"
          placeholder="Email"
          ref={emailRef}
          className={styles.input}
        ></input>
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className={styles.input}
        ></input>
        <button className={styles.signinBtn}>SignIn</button>
        <NavLink to="/signup" className={styles.signupLink}>Click here to Signup</NavLink>
      </form>
    </div>
  );
}

export default Login;
