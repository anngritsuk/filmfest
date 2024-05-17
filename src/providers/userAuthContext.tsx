import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

interface ContextProps {
  SignUp: (
    email: string,
    password: string,
    name: string,
    gender: string
  ) => Promise<void>;
  LogIn: (email: string, password: string) => Promise<void>;
  error: string;
  currentuser: User | null;
  userData: any;
}

const userContext = createContext<ContextProps | undefined>(undefined);

export const useAuth = (): ContextProps => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserAuthProvider");
  }
  return context;
};

interface UserAuthProviderProps {
  children: ReactNode;
}

const UserAuthProvider: React.FC<UserAuthProviderProps> = ({ children }) => {
  const [error, setError] = useState<string>("");
  const [currentuser, setuser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setuser(user);
      if (user) {
        const docRef = doc(db, "userinfo", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserData(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          console.log("No such document!");
        }
      } else {
        localStorage.removeItem("user");
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUserData(userData);
      setuser(userData);
    }
  }, []);

  const SignUp = async (
    email: string,
    password: string,
    name: string,
    gender: string
  ) => {
    setError("");
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const ref = doc(db, "userinfo", result.user.uid);
      await setDoc(ref, {
        name,
        gender,
        email,
        registration_date: new Date().toISOString(),
      });
      toast.success(
        `Welcome, ${userData.name}. New account create successfully`
      );
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use. Try another email.");
      } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError("Password must be at least 6 characters.");
      } else {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const LogIn = async (email: string, password: string) => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const value = {
    SignUp,
    LogIn,
    error,
    currentuser,
    userData,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserAuthProvider;
