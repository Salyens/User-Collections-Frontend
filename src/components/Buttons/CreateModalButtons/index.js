import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const CreateModalButtons = ({ handleModalToggle, handleDeleteModalToggle }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-1 position-absolute top-0 end-0">
      <Button
        className="m-1 edit-btn"
        variant="outline-primary"
        onClick={handleModalToggle}
      >
        {t("Edit button")} <i className="bi bi-pencil-fill"></i>
      </Button>
      <Button className="edit-btn" variant="outline-danger" onClick={handleDeleteModalToggle}>
      {t("Delete button")} <i className="bi bi-trash-fill"></i>
      </Button>
    </div>
  );
};

export default CreateModalButtons;
