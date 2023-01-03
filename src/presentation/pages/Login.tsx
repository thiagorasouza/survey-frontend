import React from "react";
import styles from "./Login.scss";

function Login() {
  return (
    <div className={styles.page}>
      <section className={styles.wrapper}>
        <div className={styles.brand}>
          <img src="../img/logo.png" className={styles.logo} />
          The Survey App
        </div>

        {/* <header>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.caption}>Please login to start using the app.</p>
        </header> */}

        <form className={styles.form} action="#">
          <div className={styles.inputs}>
            <input
              type="text"
              name="email"
              className={styles.email}
              placeholder="johndoe@email.com"
            />
            <input
              type="password"
              name="password"
              className={styles.password}
              placeholder="······"
            />
          </div>
          <button type="button" className={styles.login}>
            Login
          </button>
          <button type="button" className={styles.signup}>
            Sign Up
          </button>
        </form>
      </section>
      <section className={styles.sider}></section>
    </div>
  );
}

export default Login;
