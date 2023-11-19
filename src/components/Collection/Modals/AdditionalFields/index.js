import React from "react";
import NewFieldsDropDown from "../../DropDowns/NewFieldsDropDown";
import { Form } from "react-bootstrap";

const AdditionalFields = ({ newFields, onSetNewFields }) => {
  const handleNewFieldChange = (index, key, value) => {
    const updatedFields = [...newFields];
    updatedFields[index][key] = value;
    onSetNewFields(updatedFields);
  };

  // const getInputType = (fieldType) => {
  //   switch (fieldType) {
  //     case "string":
  //     case "text":
  //       return "text";
  //     case "number":
  //       return "number";
  //     case "date":
  //       return "date";
  //     default:
  //       return "text";
  //   }
  // };

  return newFields.map((field, index) => (
    <div key={index} className="mb-3 d-flex">
      <NewFieldsDropDown
        index={index}
        newFields={newFields}
        onSetNewFields={onSetNewFields}
      />
      <Form.Control
        type="text"
        placeholder="Field value"
        value={field.value || ""}
        onChange={(e) => handleNewFieldChange(index, "value", e.target.value)}
      />
    </div>
  ));
};

export default AdditionalFields;
