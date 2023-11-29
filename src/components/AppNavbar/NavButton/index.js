import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";

const GenerateNavButton = ({ endpoint, innerText }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate()
  return (
    <Button onClick={() => navigate(endpoint)} className={`${theme} border-0 p-1`} >
      {innerText}
    </Button>
  );
};

export default GenerateNavButton;
