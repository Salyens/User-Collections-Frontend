import React from "react";
import { Button } from "react-bootstrap";

const CreateModalButtons = ({ handleModalToggle, handleDeleteModalToggle }) => {
  return (
    <div className="mb-1 position-absolute top-0 end-0 edit-btn">
      <Button
        className="me-1"
        variant="outline-primary"
        onClick={handleModalToggle}
      >
        Edit <i className="bi bi-pencil-fill"></i>
      </Button>
      <Button variant="outline-danger" onClick={handleDeleteModalToggle}>
        Delete <i className="bi bi-trash-fill"></i>
      </Button>
    </div>
  );
};

export default CreateModalButtons;
