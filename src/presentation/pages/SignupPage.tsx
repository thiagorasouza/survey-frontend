import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-router-dom";
import Brand from "../components/Brand";

import styles from "./SignupPage.scss";

function SignupPage() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);

  const isPasswordValid = !!(
    password &&
    passwordConfirmation &&
    password === passwordConfirmation
  );
  const errorMessage = !isPasswordValid
    ? "Please type the same password twice."
    : "";

  useEffect(() => {
    if (passwordRef.current && passwordConfirmationRef.current) {
      passwordRef.current.setCustomValidity(errorMessage);
      passwordConfirmationRef.current.setCustomValidity(errorMessage);
    }
  }, [password, passwordConfirmation]);

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
              ref={passwordRef}
              type="password"
              name="password"
              className={styles.inputPassword}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              required
              ref={passwordConfirmationRef}
              type="password"
              name="passwordConfirmation"
              className={styles.inputPasswordConfirmation}
              placeholder="password confirmation"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
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
            <button
              type="button"
              aria-label="login"
              className={styles.btnLogin}
            >
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
