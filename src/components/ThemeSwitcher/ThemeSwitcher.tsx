import { useContext } from "react";
import { ThemeContext } from "../../providers/ThemeContextProvider";

function ThemeSwitcher() {
  const [color, setColor] = useContext(ThemeContext);

  const toggleTheme = () => {
    setColor(color === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <button onClick={toggleTheme}>
        Toggle Theme: {color === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
