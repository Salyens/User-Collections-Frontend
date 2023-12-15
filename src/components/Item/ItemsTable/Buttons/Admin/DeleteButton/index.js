import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import ApiService from "../../../../../../services/ApiService";
import { useTranslation } from "react-i18next";

const DeleteButton = ({
  isChecked,
  onSetIsChecked,
  onSetUsers,
  onSetError,
}) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleDeleteOnClick = async () => {
    try {
      setDeleteIsLoading(true);
      await ApiService.deleteUsers(isChecked);

      onSetUsers((prevData) => {
        return {
          ...prevData,
          data: prevData.data.filter((item) => !isChecked.includes(item._id)),
        };
      });
      setDeleteIsLoading(false);
      onSetIsChecked([]);
      onSetError();
    } catch (error) {
      setDeleteIsLoading(false);
      !error.response
        ? onSetError(error.message)
        : onSetError(error.response.data.message);
    }
  };
  return (
    <Button
      onClick={handleDeleteOnClick}
      className="me-1"
      variant="outline-danger"
    >
      {deleteIsLoading ? <Spinner animation="border" size="sm" /> : t("Delete")}
    </Button>
  );
};

export default DeleteButton;
