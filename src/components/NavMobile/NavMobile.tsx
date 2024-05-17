import { useClickAway } from "react-use";
import { useRef, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { routes } from "../../routes";
import { useAppDispatch } from "hooks/redux-hooks";
import { removeUser } from "../../redux/store/slices/userSlice";
import useAuth from "hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import Moon from "../../assets/Moon.png"; // Путь к иконке луны
import Sun from "../../assets/Sun.png"; // Путь к иконке солнца
import { ThemeContext } from "../../providers/ThemeContextProvider";
import styles from "./NavMobile.module.css";

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const { email } = useAuth();
  const navigate = useNavigate();
  const [, setColor] = useContext(ThemeContext);

  useClickAway(ref, () => setOpen(false));

  const clearLocalStorage = () => {
    localStorage.removeItem("sharedMovies");
    localStorage.removeItem("favoriteMovies");
    localStorage.removeItem("user");
  };

  const handleLogout = () => {
    dispatch(removeUser());
    setOpen(false);
    navigate("/login");
    clearLocalStorage();
  };
  const setDarkTheme = () => {
    setColor("dark");
  };

  const setLightTheme = () => {
    setColor("light");
  };

  return (
    <div ref={ref} className="lg:hidden relative">
      <div className={styles.navMobile}>
        <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${styles.navMobileOpen} fixed`}
          >
            <ul className={styles.navMobileList}>
              {routes.map((route, idx) => {
                const { Icon, href } = route;

                return (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    key={route.title}
                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
                  >
                    <Link
                      onClick={() => setOpen((prev) => !prev)}
                      className={styles.navMobileListItemLink}
                      to={href}
                    >
                      <span className="flex gap-1 text-lg">{route.title}</span>
                      <Icon className="text-xl" />
                    </Link>
                  </motion.li>
                );
              })}
              <div className={styles.menuTheme}>
                <div className={styles.menuBox} onClick={setDarkTheme}>
                  <img
                    src={Moon}
                    alt="darktheme-icon"
                    className={styles.themeIconMoon}
                  ></img>
                </div>
                <div className={styles.menuBox} onClick={setLightTheme}>
                  <img
                    src={Sun}
                    alt="lightheme-icon"
                    className={styles.themeIcon}
                  ></img>
                </div>
              </div>
              <motion.li
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + routes.length / 10,
                }}
                className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
              >
                <button
                  onClick={handleLogout}
                  className={
                    "flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950"
                  }
                >
                  <span className={styles.button}>Log out</span>
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
