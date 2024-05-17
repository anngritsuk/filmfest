import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/userAuthContext";
import { setUser } from "../redux/store/slices/userSlice";
import { useAppDispatch } from "hooks/redux-hooks";
import styles from "../components/Form/Form1.module.css";

// const clearLocalStorage = () => {
//   localStorage.removeItem("sharedMovies");
//   localStorage.removeItem("favoriteMovies");
// };

export default function SingUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { SignUp, currentuser } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [gender, setGender] = useState("");

  const handleRegister = async () => {
    if (pass !== confirmPass) {
      console.error("Passwords do not match");
      return;
    }
    try {
      await SignUp(email, pass, name, gender);
      if (currentuser) {
        currentuser.getIdToken().then((token: string) => {
          const userData = {
            // name: currentuser.displayName,
            email: currentuser.email,
            id: currentuser.uid,
            token: token,
          };
          dispatch(setUser(userData));
          localStorage.setItem("user", JSON.stringify(userData));
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.title}>Sign Up</h1>
      <div className={styles.inputs}>
        <div>
          <p className={styles.text}>Name</p>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
        </div>
        <div>
          <p className={styles.text}>Email</p>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </div>
        <div>
          <p className={styles.text}>Password</p>
          <input
            className={styles.input}
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Your Password"
          />
        </div>
        <div>
          <p className={styles.text}>Confirm Password</p>
          <input
            className={styles.input}
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Confirm Your Password"
          />
        </div>
        <div>
          <p className={styles.text}>Gender</p>
          <div className={styles.gender}>
            <label>
              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
              />
              Female
            </label>
          </div>
        </div>
      </div>
      <button className={styles.button} onClick={handleRegister}>
        Sign Up
      </button>
      <div>
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
}
