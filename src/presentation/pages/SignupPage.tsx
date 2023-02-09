import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { SignupResult, SignupResultType } from "../action/SignupResult";
import Brand from "../components/Brand";
import LinkButton from "../components/LinkButton";
import SubmitButton from "../components/SubmitButton";

import styles from "./SignupPage.scss";

function SignupPage() {
  const [password, setPassword] = useState("abc123");
  const [passwordConfirmation, setPasswordConfirmation] = useState("abc123");
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);
  const navigation = useNavigation();
  const signupResult = useActionData() as SignupResult;
  // console.log("🚀 ~ signupResult", signupResult);

  const submitting = navigation.state === "submitting";
  // const success =
  //   signupResult && signupResult.type === SignupResultType.Success;
  const emailInUserError =
    signupResult && signupResult.type === SignupResultType.EmailInUseError;
  const invalidParamsError =
    signupResult && signupResult.type === SignupResultType.InvalidParamsError;

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
        <div
          role="alert"
          className={classNames({
            [styles.error]: true,
            [styles.hidden]: !emailInUserError && !invalidParamsError,
          })}
        >
          {signupResult?.data}
        </div>
        <Form method="post" className={styles.form}>
          <div className={styles.inputs}>
            <input
              required
              type="text"
              name="name"
              className={styles.inputName}
              placeholder="name"
              disabled={!!submitting}
              defaultValue="John Doe"
            />
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
              ref={passwordRef}
              type="password"
              name="password"
              className={styles.inputPassword}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
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
              disabled={submitting}
              defaultValue="abc123"
            />
          </div>
          <div className={styles.buttons}>
            <SubmitButton
              caption="Sign Up"
              submitting={submitting}
              success={false}
            />
            <LinkButton
              caption="Login"
              submitting={submitting}
              success={false}
            />
          </div>
        </Form>
      </section>
      <section className={styles.sider}></section>
    </div>
  );
}

export default SignupPage;
