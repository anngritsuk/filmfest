import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Input from "../Input/Input";
import { Topbar } from "../Topbar/Topbar";
import { useAuth } from "../../providers/userAuthContext";
import icon from "../../assets/icons-down.png";
import MovieFilter from "../Filters/Filters";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [, setSearchQuery] = useState<string>("");
  const { currentuser, userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className="min-h-screen flex justify-center p-5 items-center">
          <Topbar />
        </div>
        <div className={styles.logo}>
          <Link to="/">FilmFest</Link>
        </div>
      </div>

      <div className={styles.input}>
        <Input placeholder="Search movies..." onChange={handleSearch} />
      </div>

      <div className={styles.userInfo}>
        <Link to="/settings" className={styles.userIcon}>
          {(userData?.name || currentuser?.email)?.charAt(0).toUpperCase()}
        </Link>
        <p>{userData?.name || currentuser?.email}</p>
      </div>
      <div className={styles.menu} onClick={() => setIsOpen(!isOpen)}>
        <img src={icon} alt="Menu icon" />
      </div>
      {isOpen && <MovieFilter />}
    </header>
  );
};

export default Header;
