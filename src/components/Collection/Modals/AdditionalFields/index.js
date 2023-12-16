import React from "react";
import NewFieldsDropDown from "../../DropDowns/NewFieldsDropDown";
import { Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./additionalfields.css";

const AdditionalFields = ({ newFields, onSetNewFields }) => {
  const { t } = useTranslation();
  const handleNewFieldChange = (index, key, value) => {
    const updatedFields = [...newFields];
    updatedFields[index][key] = value;
    onSetNewFields(updatedFields);
  };

  const handleDeleteField = (index) => {
    const updatedFields = [...newFields];
    updatedFields.splice(index, 1);
    onSetNewFields(updatedFields);
  };

  return newFields.map((field, index) => (
    <div key={index} className="mb-3 d-flex">
      <NewFieldsDropDown
        index={index}
        newFields={newFields}
        onSetNewFields={onSetNewFields}
      />
      <InputGroup className="position-relative">
        <Form.Control
          type="text"
          placeholder={t("Field value")}
          value={field.value || ""}
          onChange={(e) => handleNewFieldChange(index, "value", e.target.value)}
        />
        <InputGroup.Text>
          <span
            onClick={() => handleDeleteField(index)}
            className="delete_field"
          >
            <i className="bi bi-x-circle"></i>
          </span>
        </InputGroup.Text>
      </InputGroup>
    </div>
  ));
};

export default AdditionalFields;
