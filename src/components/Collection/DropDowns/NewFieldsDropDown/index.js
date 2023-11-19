import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const NewFieldsDropDown = ({ index, newFields, onSetNewFields }) => {
  const optionalFields = ["string", "text", "number", "date"];

  const handleSelect = (eventKey) => {
    const updatedFields = [...newFields];
    updatedFields[index] = { ...updatedFields[index], type: eventKey };
    onSetNewFields(updatedFields);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id={`dropdown-basic-${index}`}>
        {newFields[index].type || "Select field type"}
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
