import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import ApiService from "../../../../../../services/ApiService";
import "./../AdminTableButtonsList/buttonslist.css";

const DeleteButton = ({
  isChecked,
  onSetIsChecked,
  onSetUsers,
  onSetError,
}) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

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
      className="buttons"
      variant="outline-danger"
    >
      {deleteIsLoading ? <Spinner animation="border" size="sm" /> : "Delete"}
    </Button>
  );
};

export default DeleteButton;
