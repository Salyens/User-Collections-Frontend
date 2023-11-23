import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { ThemeContext } from "../../../contexts/ThemeContext";
import "./themeswitcher.css"

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Form>
      <Form.Label>Theme</Form.Label>
      <Form.Check
        type="switch"
        id="custom-switch"
        onClick={toggleTheme}
      />
    </Form>
  );
};

export default ThemeSwitcher;
