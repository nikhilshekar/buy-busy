import { useRef } from "react";
import styles from "../styles/signup.module.css";
import { useAuthValue } from "../authContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { createUser } = useAuthValue();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // storing user's data
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // creating user
    createUser(data) ? navigate("/login") : navigate("/signup");
  }

  return (
    <div className={styles.loginForm}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          ref={nameRef}
          className={styles.input}
        ></input>
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
        <button className={styles.signupBtn}>SignUp</button>
      </form>
    </div>
  );
}

export default Signup;
