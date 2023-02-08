import React from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { LoginResult, LoginResultType } from "../action/LoginResult";
import Brand from "../components/Brand";
import SubmitButton from "../components/SubmitButton";
import styles from "./LoginPage.scss";

function LoginPage() {
  const navigate = useNavigate();

  const navigation = useNavigation();
  const loginResult = useActionData() as LoginResult;

  const state =
    navigation.state === "submitting"
      ? "processing"
      : loginResult
      ? loginResult.type
      : "initial";
  const processing = state === "processing";
  const invalidCredentials = state === LoginResultType.InvalidCredentials;
  const unexpectedError = state === LoginResultType.UnexpectedError;
  const success = state === LoginResultType.Success;

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
          className={`${styles.error} ${
            !invalidCredentials && !unexpectedError ? styles.hidden : ""
          }`}
        >
          {invalidCredentials
            ? "Please review your email and password."
            : "Unexpected server error."}
        </div>
        <Form method="post" className={styles.form}>
          <div className={styles.inputs}>
            <input
              required
              type="email"
              name="email"
              className={styles.inputEmail}
              placeholder="email"
              disabled={processing || success}
            />
            <input
              required
              type="password"
              name="password"
              className={styles.inputPassword}
              minLength={6}
              placeholder="password"
              disabled={processing || success}
            />
          </div>
          <div className={styles.buttons}>
            <SubmitButton
              caption="Login"
              submitting={processing}
              success={success}
            />
            <button
              type="button"
              aria-label="signup"
              className={`${styles.btnSignup} ${
                processing || success ? styles.btnSignupHide : ""
              }`}
              hidden={processing || success}
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
