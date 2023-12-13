import React from "react";
import { Button } from "react-bootstrap";

const CreateCollectionButton = ({ handleModalToggle }) => {
  return (
    <Button variant="primary" className="m-3" onClick={handleModalToggle}>
      Create
    </Button>
  );
};

export default CreateCollectionButton;
