import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./LinkButton.scss";

interface LinkButtonProps {
  caption: string;
  submitting: boolean;
  success: boolean;
  link: string;
  children?: React.ReactNode;
}

function LinkButton({ caption, submitting, success, link }: LinkButtonProps) {
  const navigate = useNavigate();
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
      onClick={() => navigate(link)}
    >
      {caption}
    </button>
  );
}

export default LinkButton;
