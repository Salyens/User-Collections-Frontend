import React from "react";
import { Button } from "react-bootstrap";
import ApiService from "../../../../services/ApiService";

const TableButtons = ({
  items,
  onSetItems,
  isChecked,
  onSetIsChecked,
  handleModalToggle,
  onSetMode,
}) => {
  const handleDeleteItem = async () => {
    try {
      await ApiService.deleteItems(isChecked);
      const updatedItems = items.filter(
        (item) => !isChecked.includes(item._id)
      );
      onSetItems(updatedItems);
      onSetIsChecked([]);
    } catch (error) {
      console.log("error: ", error);
    }
    console.log(isChecked);
  };

  const handleChangeModeAndToggle = () => {
    onSetMode("create");
    handleModalToggle();
  };

  return (
    <div className="mb-1 edit-btn">
      <Button
        variant="primary"
        className="me-1"
        onClick={handleChangeModeAndToggle}
      >
        Create
      </Button>
      <Button variant="outline-danger" onClick={handleDeleteItem}>
        Delete <i className="bi bi-trash-fill"></i>
      </Button>
    </div>
  );
};

export default TableButtons;
