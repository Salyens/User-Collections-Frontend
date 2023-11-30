const validRequiredFields = (input) => {
  let error = "";
  if (!input["name"] || !input["description"] || !input["theme"]) {
    error = "Name, description and theme shouldn't be empty";
  }
  return error;
};
export default validRequiredFields;
