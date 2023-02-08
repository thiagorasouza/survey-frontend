import classNames from "classnames";
import React from "react";

import styles from "./LinkButton.scss";

interface LinkButtonProps {
  caption: string;
  submitting: boolean;
  success: boolean;
  children?: React.ReactNode;
}

function LinkButton({ caption, submitting, success }: LinkButtonProps) {
  const classesText = classNames({
    [styles.btnLink]: true,
    [styles.btnLinkHide]: submitting || success,
  });

  return (
    <button
      type="button"
      aria-label={caption}
      className={classesText}
      hidden={submitting || success}
    >
      {caption}
    </button>
  );
}

export default LinkButton;
