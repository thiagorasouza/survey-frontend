import React, { useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import LinkButton from "../components/LinkButton";
import Loader from "../components/Loader";
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

  const disableFields =
    appState.isSubmitting || appState.isLoading || appState.isSuccess;

  useEffect(() => {
    if (appState.isSuccess) {
      navigate("/surveys");
    }
  }, [appState.isSuccess]);

  useEffect(() => {
    if (!appState.isSuccess) {
      getUserToken().then((accessToken) => {
        if (accessToken) {
          navigate("/surveys");
        }
      });
    }
  }, []);

  return (
    <Loader tolerance={1000}>
      <div className={styles.page}>
        <section className={styles.formWrapper}>
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
                pattern="[A-zÀ-ú]{2,} ?[A-zÀ-ú ]*"
                minLength={2}
                maxLength={64}
                title="Names should only contain letters and spaces (2 to 64 characters long)"
                className={styles.inputName}
                placeholder="name"
                disabled={disableFields}
              />
              <input
                required
                type="email"
                name="email"
                className={styles.inputEmail}
                placeholder="email"
                disabled={disableFields}
              />
              <input
                required
                ref={passwordRef}
                type="password"
                name="password"
                pattern="(?=.*[A-Za-z])(?=.*\d).*"
                minLength={8}
                maxLength={64}
                title="Password should contain at least one letter and one number (8 to 64 characters long)"
                className={styles.inputPassword}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={disableFields}
              />
              <div className={styles.passwordCaption}>
                At least 8 chars, one letter and one number
              </div>
              <input
                required
                ref={passwordConfirmationRef}
                type="password"
                name="passwordConfirmation"
                title="Password confirmation should be match password"
                className={styles.inputPasswordConfirmation}
                placeholder="password confirmation"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                disabled={disableFields}
              />
            </div>
            <div className={styles.buttons}>
              <SubmitButton
                caption="Sign Up"
                submitting={appState.isSubmitting}
                success={appState.isLoading || appState.isSuccess}
              />
              <LinkButton
                caption="Login"
                submitting={appState.isSubmitting}
                success={appState.isLoading || appState.isSuccess}
                link="/login"
              />
            </div>
          </Form>
        </section>
        <section className={styles.sider}></section>
      </div>
    </Loader>
  );
}

export default SignupPage;
