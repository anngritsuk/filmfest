import React from "react";
import SignUp from "../../components/SingUp";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <SignUp />
    </div>
  );
}
