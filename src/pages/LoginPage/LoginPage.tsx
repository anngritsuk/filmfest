import React from "react";
import LogIn from "components/LogIn";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LogIn />
    </div>
  );
}
