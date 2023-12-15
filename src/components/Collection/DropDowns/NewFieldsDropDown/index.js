import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const NewFieldsDropDown = ({ index, newFields, onSetNewFields }) => {
  const { t } = useTranslation();
  const optionalFields = [t("String"), t("Text"), t("Number"), t("Date")];

  const handleSelect = (eventKey) => {
    const updatedFields = [...newFields];
    updatedFields[index] = { ...updatedFields[index], type: eventKey };
    onSetNewFields(updatedFields);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id={`dropdown-basic-${index}`}>
        {newFields[index].type}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {optionalFields.map((field, idx) => (
          <Dropdown.Item key={idx} eventKey={field}>
            {field}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};


export default NewFieldsDropDown;
