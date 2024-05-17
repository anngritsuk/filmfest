import { Children, FC, useState, ReactNode } from "react";
import styles from "./Form.module.css";
import { Link, Outlet } from "react-router-dom";

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
  children?: ReactNode;
}

const Form: React.FC<FormProps> = ({ title, handleClick, children }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className={styles.form}>
      <h1 className={styles.title}>{title}</h1>
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
      <button
        className={styles.button}
        onClick={() => handleClick(email, pass)}
      >
        {title}
      </button>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export { Form };

// import { Children, FC, useState, ReactNode } from "react";
// import styles from "./Form.module.css";
// import { Link, Outlet } from "react-router-dom";

// interface FormProps {
//   title: string;
//   handleClick: (name: string, email: string, pass: string) => void;
//   children?: ReactNode;
// }

// const Form: React.FC<FormProps> = ({ title, handleClick, children }) => {
//   const [inputName, setInputName] = useState("");
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");

//   return (
//     <div className={styles.form}>
//       <h1 className={styles.title}>{title}</h1>
//       <div className={styles.inputs}>
//         <div>
//           <p className={styles.text}>Name</p>
//           <input
//             className={styles.input}
//             type="text"
//             value={inputName}
//             onChange={(e) => setInputName(e.target.value)}
//             placeholder="Your Name"
//           />
//         </div>
//         <div>
//           <p className={styles.text}>Email</p>
//           <input
//             className={styles.input}
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Your Email"
//           />
//         </div>
//         <div>
//           <p className={styles.text}>Password</p>
//           <input
//             className={styles.input}
//             type="password"
//             value={pass}
//             onChange={(e) => setPass(e.target.value)}
//             placeholder="Your Password"
//           />
//         </div>
//       </div>
//       <button
//         className={styles.button}
//         onClick={() => handleClick(inputName, email, pass)}
//       >
//         {title}
//       </button>
//       <div className={styles.children}>{children}</div>
//     </div>
//   );
// };

// export { Form };
