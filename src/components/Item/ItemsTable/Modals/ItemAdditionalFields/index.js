import React from "react";
import { Form } from "react-bootstrap";
import DropdownBoolean from "../DropdownBoolean";
import timestampToDate from "../../../../../helpers/date/timestampToDate";
import { useTranslation } from "react-i18next";

const ItemAdditionalFields = ({
  oneItem,
  collection,
  mode,
  onSetChangedFields,
}) => {
  const fields = collection["additionalFields"];
  if (!fields) return null;
  const { t } = useTranslation();
  
  const handleNewFieldChange = (fieldName, value) => {
    const originalValue = collection["additionalFields"][fieldName]["value"];
    if (originalValue !== value) {
      onSetChangedFields((prev) => ({
        ...prev,
        [fieldName]: { value },
      }));
    } else {
      onSetChangedFields((prev) => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
  };

  return Object.keys(fields).map((field, index) => {
    const fieldType = collection["additionalFields"][field]["type"];
    let fieldValue;
    if (oneItem["additionalFields"]) {
      fieldValue = oneItem["additionalFields"][field]["value"];
      if (fieldType === "date") fieldValue = timestampToDate(fieldValue);
    }

    return (
      <div key={`${field}-${mode}`}>
        <Form.Label>{field}</Form.Label>
        {fieldType === "boolean" ? (
          <DropdownBoolean
            initialValue={mode === "edit" ? fieldValue : false}
            field={field}
            handleNewFieldChange={handleNewFieldChange}
          />
        ) : (
          <Form.Control
            type={fieldType === "string" ? "text" : fieldType}
            placeholder={t("Field value")}
            defaultValue={mode === "edit" ? fieldValue : ""}
            onChange={(e) => handleNewFieldChange(field, e.target.value)}
          />
        )}
      </div>
    );
  });
};

export default ItemAdditionalFields;
