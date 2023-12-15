import React, { useContext, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import ApiService from "../../../../services/ApiService";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const TableButtons = ({
  onSetItems,
  isChecked,
  onSetIsChecked,
  handleModalToggle,
  onSetErrors,
  onSetModalCreateShow,
}) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const handleDeleteItem = async () => {
    try {
      setDeleteIsLoading(true);
      await ApiService.deleteItems(isChecked);
      onSetItems((prevData) => {
        return {
          ...prevData,
          ...prevData.collections,
          data: prevData.data.filter((item) => !isChecked.includes(item._id)),
        };
      });
      setDeleteIsLoading(false);
      onSetErrors([]);
      onSetIsChecked([]);
    } catch (error) {
      onSetErrors("Something went wrong while deleting the item");
      setDeleteIsLoading(false);
    }
  };
  const handleChangeModeAndToggle = () => {
    handleModalToggle(onSetModalCreateShow);
  };

  return (
    <div className={theme}>
      <Button
        variant="primary"
        className="me-1"
        onClick={handleChangeModeAndToggle}
      >
        {t("Create button")} <i className="bi bi-pencil-fill"></i>
      </Button>
      <Button variant="outline-danger" onClick={handleDeleteItem}>
        {deleteIsLoading ? <Spinner animation="border" size="sm" /> : t("Delete button")}
        <i className="bi bi-trash-fill"></i>
      </Button>
    </div>
  );
};

export default TableButtons;
