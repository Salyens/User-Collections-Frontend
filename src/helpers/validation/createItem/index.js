const createItemValidation = (additionalFields, input) => {
  const errors = [];
  if (!input["name"]) {
    errors.push(`Field "name" is required`);
  }
  if (
    !input["tags"] ||
    !Array.isArray(input["tags"]) ||
    input["tags"].length === 0
  ) {
    errors.push('Field "tags" is required');
  }

  if (!additionalFields) return errors.length > 0 ? errors : true;
  const inputAdditionalFields = input["additionalFields"] || {};
  const inputAdditionalFieldsKeys = Object.keys(inputAdditionalFields);
  const additionalFieldsKeys = Object.keys(additionalFields);

  additionalFieldsKeys.forEach((key) => {
    if (!inputAdditionalFieldsKeys.includes(key))
      errors.push(`Additional field "${key}" is required`);
  });

  return errors.length > 0 ? errors : true;
};

export default createItemValidation;
