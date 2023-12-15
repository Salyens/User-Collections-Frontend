import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const CreateCollectionButton = ({ handleModalToggle }) => {
  const { t } = useTranslation();
  return (
    <Button variant="primary" className="m-3" onClick={handleModalToggle}>
      {t("Create button")}
    </Button>
  );
};

export default CreateCollectionButton;
