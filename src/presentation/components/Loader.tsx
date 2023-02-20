import React, { useEffect, useState } from "react";
import useAppState from "../hooks/useAppState";
import styles from "./Loader.scss";

interface LoaderProps {
  children?: React.ReactElement;
}

function Loader({ children }: LoaderProps) {
  const appState = useAppState();
  const [loading, setLoading] = useState(false);
  const tolerance = 500;

  useEffect(() => {
    if (appState.isLoading) {
      const timeoutId = setTimeout(() => setLoading(true), tolerance);
      return () => clearTimeout(timeoutId);
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
