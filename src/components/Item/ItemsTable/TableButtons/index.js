import React, { useContext, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import ApiService from "../../../../services/ApiService";
import { ThemeContext } from "../../../../contexts/ThemeContext";

const TableButtons = ({
  onSetItems,
  isChecked,
  onSetIsChecked,
  handleModalToggle,
  onSetMode,
  onSetErrors,
}) => {

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
    onSetMode("create");
    handleModalToggle();
  };

  return (
    <div className={theme}>
      <Button
        variant="primary"
        className="me-1"
        onClick={handleChangeModeAndToggle}
      >
        Create
      </Button>
      <Button variant="outline-danger" onClick={handleDeleteItem}>
        {deleteIsLoading ? <Spinner animation="border" size="sm" /> : "Delete"}
        <i className="bi bi-trash-fill"></i>
      </Button>
    </div>
  );
};

export default TableButtons;
