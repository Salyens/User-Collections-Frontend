import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";

const GenerateNavButton = ({ endpoint, innerText }) => {
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-primary text-white border-0 p-1"
      : "bg-dark text-white border-0 p-1";
  const navigate = useNavigate()
  return (
    <Button onClick={() => navigate(endpoint)} className={themeClass}>
      {innerText}
    </Button>
  );
};

export default GenerateNavButton;
