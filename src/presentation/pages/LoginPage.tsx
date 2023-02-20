import React, { useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import LinkButton from "../components/LinkButton";
import Loader from "../components/Loader";
import SubmitButton from "../components/SubmitButton";
import useAppState from "../hooks/useAppState";
import useSession from "../hooks/useSession";
import styles from "./LoginPage.scss";

function LoginPage() {
  const navigate = useNavigate();
  const appState = useAppState();
  const { getUserToken } = useSession();

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
        <section className={styles.wrapper}>
          <Brand />
          {appState.isError && (
            <div role="alert" className={styles.error}>
              {appState.error.name === "InvalidCredentialsError"
                ? "Please review your email and password."
                : "UnexpectedError. Please try again later."}
            </div>
          )}
          <Form method="post" className={styles.form}>
            <div className={styles.inputs}>
              <input
                required
                type="email"
                name="email"
                className={styles.inputEmail}
                placeholder="email"
                disabled={disableFields}
                defaultValue="testaccount@email.com"
              />
              <input
                required
                type="password"
                name="password"
                className={styles.inputPassword}
                minLength={6}
                placeholder="password"
                disabled={disableFields}
                defaultValue="testaccount123"
              />
            </div>
            <div className={styles.buttons}>
              <SubmitButton
                caption="Login"
                submitting={appState.isSubmitting}
                success={appState.isSuccess || appState.isLoading}
              />
              <LinkButton
                caption="Sign Up"
                submitting={appState.isSubmitting}
                success={appState.isSuccess || appState.isLoading}
                link="/signup"
              />
            </div>
          </Form>
        </section>
        <section className={styles.sider}></section>
      </div>
    </Loader>
  );
}

export default LoginPage;
