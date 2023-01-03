import React from "react";
import Brand from "../components/Brand";
import styles from "./Login.scss";

function Login() {
  return (
    <div className={styles.page}>
      <section className={styles.wrapper}>
        <Brand />

        <form className={styles.form}>
          <div className={styles.inputs}>
            <input
              required
              type="email"
              name="email"
              className={styles.inputEmail}
              placeholder="email"
            />
            <input
              required
              type="password"
              name="password"
              className={styles.inputPassword}
              placeholder="password"
              minLength={6}
            />
          </div>
          <button type="submit" className={styles.btnLogin}>
            Login
          </button>
          <button type="button" className={styles.btnSignup}>
            Sign Up
          </button>
        </form>
      </section>
      <section className={styles.sider}></section>
    </div>
  );
}

export default Login;
