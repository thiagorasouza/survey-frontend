import React from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { LoginResult } from "../action/LoginResult";
import Brand from "../components/Brand";
import styles from "./LoginPage.scss";

function LoginPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  // console.log("🚀 ~ submitting", submitting);

  const loginResult = useActionData() as LoginResult;
  const success = !submitting && loginResult?.success === true;
  const failure = !submitting && loginResult?.success === false;

  if (success) {
    setTimeout(() => {
      navigate("/surveys");
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <section className={styles.wrapper}>
        <Brand />
        <div
          role="alert"
          className={`${styles.error} ${!failure ? styles.hidden : ""}`}
        >
          Please <strong>review</strong> your email and password.
        </div>
        <Form method="post" className={styles.form}>
          <div className={styles.inputs}>
            <input
              required
              type="email"
              name="email"
              className={styles.inputEmail}
              placeholder="email"
              disabled={submitting || success}
            />
            <input
              required
              type="password"
              name="password"
              className={styles.inputPassword}
              minLength={6}
              placeholder="password"
              disabled={submitting || success}
            />
          </div>
          <div className={styles.buttons}>
            <button
              type="submit"
              aria-label="login"
              className={`${styles.btnLogin} ${
                submitting ? styles.btnLoginSubmitting : ""
              } ${success ? styles.btnLoginSuccess : ""}`}
              disabled={submitting || success}
            >
              {success ? (
                <svg
                  viewBox="0 0 100 100"
                  aria-label="checkmark"
                  className={styles.checkmarkViewbox}
                >
                  <path
                    d="M 27.11 52.30 l 13.65 13.84 l 32.12 -32.31"
                    className={styles.checkmarkPath}
                  ></path>
                </svg>
              ) : submitting ? (
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
                submitting || success ? styles.btnSignupHide : ""
              }`}
              hidden={submitting || success}
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

export default LoginPage;
