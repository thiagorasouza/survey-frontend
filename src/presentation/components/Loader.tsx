import React, { useEffect, useState } from "react";
import useAppState from "../hooks/useAppState";
import styles from "./Loader.scss";

interface LoaderProps {
  tolerance?: number;
  children?: React.ReactElement;
}

function Loader({ children, tolerance = 0 }: LoaderProps) {
  const appState = useAppState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appState.isLoading) {
      if (tolerance > 0) {
        const timeoutId = setTimeout(() => setLoading(true), tolerance);
        return () => clearTimeout(timeoutId);
      } else {
        setLoading(true);
      }
    } else {
      setLoading(false);
    }
  }, [appState.isLoading]);

  return (
    <>
      {loading && (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      )}
      {children}
    </>
  );
}

export default Loader;
