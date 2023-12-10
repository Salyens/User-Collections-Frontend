import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";

const GenerateNavButton = ({ endpoint, innerText }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Link to={endpoint} className={`${theme} btn border-0`}>
      {innerText}
    </Link>
  );
};

export default GenerateNavButton;
