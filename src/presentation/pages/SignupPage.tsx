import React from "react";
import { Form } from "react-router-dom";
import Brand from "../components/Brand";

import styles from "./SignupPage.scss";

function SignupPage() {
  return (
    <div className={styles.page}>
      <section className={styles.wrapper}>
        <Brand />
        {/* <div role="alert" className={styles.error}>
          Error
        </div> */}
        <Form method="post" className={styles.form}>
          <div className={styles.inputs}>
            <input
              required
              type="text"
              name="name"
              className={styles.inputName}
              placeholder="name"
            />
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
              minLength={6}
              placeholder="password"
            />
            <input
              required
              type="password"
              name="passwordConfirmation"
              className={styles.inputPasswordConfirmation}
              minLength={6}
              placeholder="password confirmation"
            />
          </div>
          <div className={styles.buttons}>
            <button
              type="submit"
              aria-label="signup"
              className={styles.btnSignup}
            >
              Signup
            </button>
            <button type="button" className={styles.btnLogin}>
              Login
            </button>
          </div>
        </Form>
      </section>
      <section className={styles.sider}></section>
    </div>
  );
}

export default SignupPage;
