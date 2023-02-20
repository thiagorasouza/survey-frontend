import React from "react";
import styles from "./SubmitButton.scss";
import classNames from "classnames";

interface SubmitButtonProps {
  caption: string;
  submitting: boolean;
  success: boolean;
  noShadow?: boolean;
  children?: React.ReactNode;
}

function SubmitButton({
  caption,
  submitting,
  success,
  noShadow = false,
}: SubmitButtonProps) {
  const classesText = classNames({
    [styles.btnSubmit]: true,
    [styles.btnSubmitting]: submitting,
    [styles.btnSuccess]: success,
    [styles.btnShadow]: !noShadow,
  });

  const spinnerAnimation = (
    <>
      <span aria-label="spinner" className={styles.spinner}></span>
      {`Processing...`}
    </>
  );

  const checkMarkAnimation = (
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
  );

  return (
    <button
      type="submit"
      aria-label={caption}
      className={classesText}
      disabled={submitting || success}
    >
      {success ? checkMarkAnimation : submitting ? spinnerAnimation : caption}
    </button>
  );
}

export default SubmitButton;
