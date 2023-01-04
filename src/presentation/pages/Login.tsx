import React from "react";
import { Form, useNavigation } from "react-router-dom";
import Brand from "../components/Brand";
import styles from "./Login.scss";

function Login() {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

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
              defaultValue="johndoe@email.com"
            />
            <input
              required
              type="password"
              name="password"
              className={styles.inputPassword}
              minLength={6}
              placeholder="password"
              disabled={submitting}
              defaultValue="123456"
            />
          </div>
          <div className={styles.buttons}>
            <button
              type="submit"
              aria-label="login"
              className={`${styles.btnLogin} ${
                submitting ? styles.btnLoginSubmitting : ""
              }`}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span aria-label="spinner" className={styles.spinner}></span>
                  {`Logging in...`}
                </>
              ) : (
                `Login`
              )}
            </button>
            <button
              type="button"
              className={`${styles.btnSignup} ${
                submitting ? styles.btnSignupSubmitting : ""
              }`}
              hidden={submitting}
            >
              Sign Up
            </button>
          </div>
        </Form>
      </section>
      <section className={styles.sider}></section>
    </div>
  );
}

export default Login;
