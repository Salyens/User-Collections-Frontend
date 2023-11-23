const hasEmptyValues = (requiredFields, additionalFields) => {
  const errors = [];

  Object.keys(requiredFields).forEach(key => {
    const value = requiredFields[key];
    if (!value) errors.push(`Field ${key} shouldn't be empty`);
  });

  Object.keys(additionalFields).forEach(key => {
    const value = additionalFields[key]["value"];
    if (!value && typeof value !== "boolean" && key !== "additionalFields") errors.push(`Field ${key} shouldn't be empty`);
  });

  return errors.length > 0 ? errors : false;
};

export default hasEmptyValues;
