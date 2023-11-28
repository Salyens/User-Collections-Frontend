const typeCastAdditionalFields = (newFields) => {
  const errors = [];
  const additionalFields = newFields.reduce((acc, field) => {
    if (field.type && field.value) {
      if (acc.hasOwnProperty(field.value)) {
        errors.push(
          `Field with value '${field.value}' already exists. Skipping duplicate.`
        );
      } else {
        if (field.type === "text") {
          acc[field.value] = { type: "string" };
        } else if (field.type === "string") {
          acc[field.value] = {
            type: field.type,
            isOneString: true,
          };
        } else {
          acc[field.value] = { type: field.type };
        }
      }
    }
    return acc;
  }, {});
  return { additionalFields, errors };
};

export default typeCastAdditionalFields;
