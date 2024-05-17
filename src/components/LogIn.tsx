import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/userAuthContext";
import { setUser } from "../redux/store/slices/userSlice";
import { useAppDispatch } from "hooks/redux-hooks";
import styles from "../components/Form/Form.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const clearLocalStorage = () => {
  localStorage.removeItem("sharedMovies");
  localStorage.removeItem("favoriteMovies");
};

export default function LogIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { LogIn, currentuser } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    try {
      await LogIn(email, pass);
      if (currentuser) {
        currentuser.getIdToken().then((token: string) => {
          const userData = {
            email: currentuser.email,
            id: currentuser.uid,
            token: token,
          };
          dispatch(setUser(userData));

          localStorage.setItem("user", JSON.stringify(userData));
        });

        toast.info("🦄 Welcome back!", {
          position: "bottom-right",
          autoClose: 4999,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
        });

        clearLocalStorage();
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.title}>Log In</h1>
      <div className={styles.inputs}>
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
      </div>
      <button className={styles.button} onClick={handleLogin}>
        Log In
      </button>
      <div>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
}
