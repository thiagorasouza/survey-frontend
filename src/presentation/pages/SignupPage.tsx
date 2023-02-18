import React, { useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import LinkButton from "../components/LinkButton";
import SubmitButton from "../components/SubmitButton";
import useAppState from "../hooks/useAppState";
import usePasswordValidation from "../hooks/usePasswordValidation";
import useSession from "../hooks/useSession";

import styles from "./SignupPage.scss";

function SignupPage() {
  const navigate = useNavigate();
  const appState = useAppState();
  const { getUserToken } = useSession();

  const {
    setPassword,
    setPasswordConfirmation,
    passwordRef,
    passwordConfirmationRef,
  } = usePasswordValidation();

  const disableFields = appState.isSubmitting || appState.isSuccess;

  if (appState.isSuccess) {
    setTimeout(() => {
      navigate("/surveys");
    }, 1000);
  }

  useEffect(() => {
    getUserToken().then((accessToken) => {
      if (accessToken) {
        navigate("/surveys");
      }
    });
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.wrapper}>
        <Brand />
        {appState.isError && (
          <div role="alert" className={styles.error}>
            {appState.error.message}
          </div>
        )}
        <Form method="post" className={styles.form}>
          <div className={styles.inputs}>
            <input
              required
              type="text"
              name="name"
              className={styles.inputName}
              placeholder="name"
              disabled={disableFields}
              defaultValue="John Doe"
            />
            <input
              required
              type="email"
              name="email"
              className={styles.inputEmail}
              placeholder="email"
              disabled={disableFields}
              defaultValue="johndoe@email.com"
            />
            <input
              required
              ref={passwordRef}
              type="password"
              name="password"
              className={styles.inputPassword}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={disableFields}
              defaultValue="abc123"
            />
            <input
              required
              ref={passwordConfirmationRef}
              type="password"
              name="passwordConfirmation"
              className={styles.inputPasswordConfirmation}
              placeholder="password confirmation"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              disabled={disableFields}
              defaultValue="abc123"
            />
          </div>
          <div className={styles.buttons}>
            <SubmitButton
              caption="Sign Up"
              submitting={appState.isSubmitting}
              success={appState.isSuccess}
            />
            <LinkButton
              caption="Login"
              submitting={appState.isSubmitting}
              success={appState.isSuccess}
              link="/login"
            />
          </div>
        </Form>
      </section>
      <section className={styles.sider}></section>
    </div>
  );
}

export default SignupPage;
