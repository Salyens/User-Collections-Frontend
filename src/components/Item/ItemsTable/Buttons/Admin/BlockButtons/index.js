import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import ApiService from "../../../../../../services/ApiService";
import { useTranslation } from "react-i18next";

const BlockButtons = ({ isChecked, onSetIsChecked, onSetUsers, onSetError }) => {
  const [blockIsLoading, setBlockIsLoading] = useState(false);
  const [unBlockIsLoading, setUnBlockIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleChangeStatus = async (blockStatus) => {
    try {

      blockStatus ? setBlockIsLoading(true) : setUnBlockIsLoading(true);
      await ApiService.changeUsersStatus(blockStatus, isChecked);
      onSetUsers((prevData) => ({
        ...prevData,
        data: prevData.data.map((el) =>
          isChecked.includes(el._id) ? { ...el, status: blockStatus } : el
        ),
      }));

      blockStatus ? setBlockIsLoading(false) : setUnBlockIsLoading(false);
      onSetIsChecked([]);
      onSetError();
    } catch (error) {
      blockStatus ? setBlockIsLoading(false) : setUnBlockIsLoading(false);
      !error.response
        ? onSetError(error.message)
        : onSetError(error.response.data.message);
    }
  };
  return (
    <>
      <Button
        onClick={() => handleChangeStatus(true)}
        className="me-1"
        variant="outline-warning"
      >
        {blockIsLoading ? <Spinner animation="border" size="sm" /> : t("Block")}
      </Button>
      <Button
        onClick={() => handleChangeStatus(false)}
        className="me-1"
        variant="outline-success"
      >
        {unBlockIsLoading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          t("Unblock")
        )}
      </Button>
    </>
  );
};

export default BlockButtons;
