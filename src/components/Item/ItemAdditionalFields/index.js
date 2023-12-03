import React from "react";
import transformToDate from "../../../helpers/transformToDate";
import { Card } from "react-bootstrap";

const ItemAdditionalFields = ({ item, collection }) => {
  if (!item || !item["additionalFields"] || !collection) return;
  const additionalFieldsKeys = Object.keys(item["additionalFields"]);
  return additionalFieldsKeys.map((key) => {
    const fieldValue = item["additionalFields"][key]["value"];
    const fieldType = collection["additionalFields"][key]["type"];
    if (fieldType === "date") {
      return (
        <Card.Text key={key}>
          {key}: {transformToDate(fieldValue)}
        </Card.Text>
      );
    } else if (fieldType === "boolean") {
      return (
        <Card.Text key={key}>
          {key}: {fieldValue ? "Yes" : "No"}
        </Card.Text>
      );
    }
    return (
      <Card.Text key={key}>
        {key}: {fieldValue}
      </Card.Text>
    );
  });
};

export default ItemAdditionalFields;
