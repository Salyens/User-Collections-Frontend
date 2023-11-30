import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { ThemeContext } from "../../../contexts/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    setTheme(
      theme === "bg-light text-dark"
        ? "bg-dark text-white border-light"
        : "bg-light text-dark"
    );
    localStorage.setItem("theme", theme);
  };
  useEffect(() => localStorage.setItem("theme", theme), [theme]);

  return (
    <Form>
      <Form.Label>Theme</Form.Label>
      <Form.Check type="switch" className={theme} onClick={toggleTheme} />
    </Form>
  );
};

export default ThemeSwitcher;
