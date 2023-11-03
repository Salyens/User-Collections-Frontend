import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GenerateNavButton = ({ endpoint, innerText }) => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(endpoint)} className="text-light ">
      {innerText}
    </Button>
  );
};

export default GenerateNavButton;
