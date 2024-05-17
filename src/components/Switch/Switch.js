import React, { useContext } from "react";
import './Switch.css';
import { ThemeContext } from "providers/ThemeContextProvider";

const Switch = () => { 
    const [color, setColor] = useContext(ThemeContext);

    const handleChange = (event) => {
        setColor(event.target.checked ? "dark" : "light");
    };

    return (
      <>
        <input
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
          checked={color === "dark"}
          onChange={handleChange}
        />
        <label
          className="react-switch-label"
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
        </label>
      </>
    );
};

export default Switch;
