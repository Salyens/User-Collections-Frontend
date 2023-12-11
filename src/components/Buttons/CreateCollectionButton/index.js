import React from "react";
import { Button } from "react-bootstrap";
import "./createcollectionbutton.css"

const CreateCollectionButton = ({ handleModalToggle }) => {
  return (
    <Button
      variant="primary"
      className="create-btn"
      onClick={handleModalToggle}
    >
      Create
    </Button>
  );
};

export default CreateCollectionButton;
