import transformToDate from "../../../../helpers/transformToDate";

const OneRow = ({ item, allFields, collection }) => {
  const unWrappedItem = { ...item, ...item["additionalFields"] };

  const fieldsMap = {
    createdDate: (fieldValue) => transformToDate(fieldValue),
    tags: (fieldValue) => fieldValue.join(", "),
    name: (fieldValue) => fieldValue,
    additionalFields: {
      boolean: (fieldValue) => (fieldValue ? "Yes" : "No"),
      date: (fieldValue) => transformToDate(fieldValue),
      string: (fieldValue) => fieldValue,
      number: (fieldValue) => fieldValue,
    },
  };

  return (
    <tr>
      {item &&
        allFields.map((field, index) => {
          const fieldValue = unWrappedItem[field];
          const additionalField = collection["additionalFields"][field];
          let displayValue;

          if (additionalField) {
            displayValue = fieldsMap["additionalFields"][
              additionalField["type"]
            ](fieldValue["value"]);
          } else displayValue = fieldsMap[field](fieldValue);
          return <td key={`${item._id}-${index}`}>{displayValue}</td>;
        })}
    </tr>
  );
};

export default OneRow;
