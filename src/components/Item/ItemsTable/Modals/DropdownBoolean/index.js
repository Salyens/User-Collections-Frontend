import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

const DropdownBoolean = ({ initialValue, field, handleNewFieldChange }) => {
  const [selectedValue, setSelectedValue] = useState(
    initialValue ? "Yes" : "No"
  );

  useEffect(() => {
    setSelectedValue(initialValue ? "Yes" : "No");
    handleNewFieldChange(field, initialValue);
  }, [initialValue]);

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
    handleNewFieldChange(field, eventKey === "Yes");
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selectedValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
        <Dropdown.Item eventKey="No">No</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownBoolean;
