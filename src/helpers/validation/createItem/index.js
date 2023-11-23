const createItemValidation = (additionalFields, input) => {
  const basicKeys = ["name", "tags"];
  const errors = [];
  basicKeys.forEach((key) => {
    if (!(key in input)) {
      errors.push(`Field "${key}" is required`);
    } else if (
      key === "tags" &&
      (!Array.isArray(input[key]) || input[key].length === 0)
    ) {
      errors.push('Field "tags" is required');
    }
  });

  const inputAdditionalFields = input["additionalFields"] || {};
  const inputAdditionalFieldsKeys = Object.keys(inputAdditionalFields);
  const additionalFieldsKeys = Object.keys(additionalFields);

  additionalFieldsKeys.forEach((key) => {
    if (!inputAdditionalFieldsKeys.includes(key)) {
      errors.push(`Additional field "${key}" is required`);
    } else if (!inputAdditionalFields[key]) {
      errors.push(`Additional field "${key}" must not be empty`);
    }
  });

  return errors.length > 0 ? errors : true;
};

export default createItemValidation;
