const hasEmptyValues = (data) => {
  const errors = Object.keys(data).reduce((acc, key) => {
    const value = data[key];
    if (!value) acc.push(`Field ${key} shouldn't be empty`);
    return acc;
  }, []);

  if (errors.length > 0) return errors;
  return false;
};
export default hasEmptyValues;
