const validRequiredFields = (input) => {
  if (!input["name"] || !input["description"] || !input["theme"]) return true;
};
export default validRequiredFields;
