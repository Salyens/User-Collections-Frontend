import transformToDate from "../../../../helpers/transformToDate";

const OneItem = ({ item, allFields, collection }) => {
  const unWrappedItem = { ...item, ...item["additionalFields"] };

  const fieldsMap = {
    createdDate: (fieldValue) => transformToDate(fieldValue),
    tags: (fieldValue) => fieldValue.join(", "),
    additionalFields: {
      boolean: (fieldValue) => (fieldValue["value"] ? "Yes" : "No"),
      date: (fieldValue) => transformToDate(fieldValue["value"]),
    },
  };

  return (
    <tr>
      {item &&
        allFields.map((field, index) => {
          const fieldValue = unWrappedItem[field];
          const additionalField = collection["additionalFields"][field];
          let displayValue;

          if (additionalField && additionalField["type"] === "date") {
            displayValue = transformToDate(fieldValue.value);
          } else if (additionalField && additionalField["type"] === "boolean") {
            displayValue = fieldValue["value"] ? "Yes" : "No";
          } 
          
          else if (field === "createdDate") {
            displayValue = transformToDate(fieldValue);
          } else if (field === "tags") {
            displayValue = fieldValue.join(", ");
          } else if (
            fieldValue &&
            typeof fieldValue === "object" &&
            "value" in fieldValue
          ) {
            displayValue = fieldValue.value;
          } else {
            displayValue = fieldValue;
          }

          return <td key={`${item._id}-${index}`}>{displayValue}</td>;
        })}
    </tr>
  );
};

export default OneItem;
