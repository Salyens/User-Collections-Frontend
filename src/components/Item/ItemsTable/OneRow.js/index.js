import { Form } from "react-bootstrap";
import transformToDate from "../../../../helpers/transformToDate";

const OneRow = ({ item, allFields, collection, isChecked, onSetIsChecked }) => {
  const unWrappedItem = { ...item, ...item["additionalFields"] };
  const { _id } = item;

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

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    onSetIsChecked((prevChecked) =>
      checked ? [...prevChecked, _id] : prevChecked.filter((userId) => userId !== _id))
  };
  

  return (
    <tr>
      <td>
        <Form.Check
          type="checkbox"
          aria-label="select user"
          onChange={handleCheckboxChange}
          checked={isChecked.includes(_id)}
        />
      </td>
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
