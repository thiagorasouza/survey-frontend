import React from "react";
import { Form, useNavigation } from "react-router-dom";
import Brand from "../components/Brand";
import styles from "./Login.scss";

function Login() {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  // console.log("🚀 ~ submitting", submitting);

  return (
    <div className={styles.page}>
      <section className={styles.wrapper}>
        <Brand />

        <Form method="post" className={styles.form}>
          <div className={styles.inputs}>
            <input
              required
              type="email"
              name="email"
              className={styles.inputEmail}
              placeholder="email"
              disabled={submitting}
            />
            <input
              required
              type="password"
              name="password"
              className={styles.inputPassword}
              minLength={6}
              placeholder="password"
            />
          </div>
          <button type="submit" className={styles.btnLogin}>
            Login
          </button>
          <button type="button" className={styles.btnSignup}>
            Sign Up
          </button>
        </Form>
      </section>
      <section className={styles.sider}></section>
    </div>
  );
}

export default Login;
