import React from "react";
import styles from "./Brand.scss";

function Brand() {
  return (
    <div className={styles.brand}>
      <img src="../img/logo.png" className={styles.logo} />
      The Survey App
    </div>
  );
}

export default Brand;
