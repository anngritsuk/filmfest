import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
