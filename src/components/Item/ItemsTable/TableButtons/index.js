import React from "react";
import { Button } from "react-bootstrap";
import ApiService from "../../../../services/ApiService";

const TableButtons = ({ items, onSetItems, isChecked, onSetIsChecked }) => {
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
  return (
    <div className="mb-1 edit-btn">
      <Button variant="primary" className="me-1">
        Create
      </Button>
      <Button className="me-1" variant="outline-primary">
        Edit <i className="bi bi-pencil-fill"></i>
      </Button>
      <Button variant="outline-danger" onClick={handleDeleteItem}>
        Delete <i className="bi bi-trash-fill"></i>
      </Button>
    </div>
  );
};

export default TableButtons;
