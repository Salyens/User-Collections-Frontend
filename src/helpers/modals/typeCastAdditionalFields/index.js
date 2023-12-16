const typeCastAdditionalFields = (newFields, optionalFieldTypes) => {
  const errors = [];
  const additionalFields = newFields.reduce((acc, field) => {
    if (!field.type && !field.value) return;
    if (acc.hasOwnProperty(field.value)) {
      return errors.push(
        `Field with value '${field.value}' already exists. Skipping duplicate.`
      );
    }

    switch (field.type) {
      case optionalFieldTypes["text"]:
        acc[field.value] = { type: "string" };
        break;
      case optionalFieldTypes["string"]:
        acc[field.value] = {
          type: "string",
          isOneString: true,
        };
        break;
      case optionalFieldTypes["number"]:
        acc[field.value] = { type: "number" };
        break;
      case optionalFieldTypes["date"]:
        acc[field.value] = { type: "date" };
        break;
    }
    return acc;
  }, {});
  return { additionalFields, errors };
};

export default typeCastAdditionalFields;
