import convertDateToTimestamp from "./date/convertDateToTimestamp";

const prepareAdditionalFields = (changedFields, collection) => {
  const updatedAdditionalFields = {};
  Object.keys(changedFields).forEach((fieldName) => {
    const field = collection["additionalFields"][fieldName];
    let value = changedFields[fieldName].value;
    if (field.type === "number") {
      value = Number(value);
    } else if (field.type === "date") {
      value = convertDateToTimestamp(value);
    }

    updatedAdditionalFields[fieldName] = {
      ...changedFields[fieldName],
      value,
    };
  });
  return updatedAdditionalFields;
};
export default prepareAdditionalFields;
