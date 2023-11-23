import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import ApiService from "../../../../services/ApiService";
import { ThemeContext } from "../../../../contexts/ThemeContext";

const TableButtons = ({
  items,
  onSetItems,
  isChecked,
  onSetIsChecked,
  handleModalToggle,
  onSetMode,
}) => {
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-light text-dark  "
      : "bg-dark text-white";

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
  };

  const handleChangeModeAndToggle = () => {
    onSetMode("create");
    handleModalToggle();
  };

  return (
    <div className={themeClass}>
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
