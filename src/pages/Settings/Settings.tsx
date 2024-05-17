import React, { useState, useContext } from "react";
import Header from "components/Header/Header";
import { useAuth } from "../../providers/userAuthContext";
import { updatePassword } from "firebase/auth";
import Switch from "components/Switch/Switch";
import { ThemeContext } from "../../providers/ThemeContextProvider";
import styles from "../Settings/Settings.module.css";
import { useNavigate } from "react-router-dom";

const handleSearch = (query: string) => {
  console.log(query);
};

export default function Settings() {
  const { currentuser, userData } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [theme] = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleSave = () => {};

  // const handleThemeChange = (checked: boolean) => {
  //   setTheme(checked ? "dark" : "light");
  //   document.body.className = checked ? "dark" : "light";
  // };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation password do not match.");
      return;
    }

    try {
      if (currentuser) {
        await updatePassword(currentuser, newPassword);
        alert("Password updated successfully");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div
      className={styles.pages}
      style={{
        background: theme === "dark" ? "#1a1a1a" : "#f0f0f0",
        color: theme === "dark" ? "#fff" : "#fff",
      }}
    >
      <Header onSearch={handleSearch}></Header>
      <div className={styles.container}>
        <div className={styles.section}>
          <h2 className={styles.title}>Profile Information</h2>
          <div className={styles.group}>
            <div className={styles.left}>
              Name
              <p className={styles.data}>
                {" "}
                {userData?.name || currentuser?.email}
              </p>
            </div>
            <div className={styles.right}>
              Email
              <p className={styles.data}>{currentuser?.email}</p>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.title}>Change Password</h2>
          <div className={styles.group2}>
            <div className={styles.left}>
              Password
              <input
                className={styles.input}
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
              />
            </div>
            <div className={styles.right}>
              New Password
              <input
                className={styles.input}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
              <div>
                <div className={styles.right}>Confirm Password</div>
                <input
                  className={styles.input}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </div>
              <button onClick={handleChangePassword}>Change Password</button>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.title}>Color Mode</h2>
          <div className={styles.group3}>
            <div className={styles.left}>
              <p className={styles.subtilte}>{theme}</p>
              <p>Use {theme} theme</p>
            </div>
            <div className={styles.right}>
              <Switch />
            </div>
          </div>
        </div>
        <div className={styles.group4}>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
