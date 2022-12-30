import React from "react";
import * as ReactDOM from "react-dom/client";
import styles from "./index.scss";

function App() {
  return (
    <div>
      <h1 className={styles.red}>Survey Frontend App</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ad
        vitae a incidunt! Ex, rerum vel harum iusto aliquam voluptate mollitia
        labore esse, minus quod omnis doloremque numquam libero quibusdam!
      </p>
    </div>
  );
}

const main = document.getElementById("main");
console.log("🚀 ~ main", main);
const root = ReactDOM.createRoot(document.getElementById("main"));
root.render(<App />);
