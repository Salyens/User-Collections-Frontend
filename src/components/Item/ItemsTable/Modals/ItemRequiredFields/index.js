import { Form } from "react-bootstrap";

const ItemRequiredFields = ({
  oneItem,
  input,
  onSetInput,
  mode,
  onSetSeparatedTags,
}) => {

  const handleInputChange = (key, value) => {
    if (key === "tags") {
      const tags = value.split(" ").map((tag) => `#${tag}`);
      onSetInput((prev) => ({ ...prev, [key]: tags }));
    } else {
      onSetInput((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleTagInputChange = (e) => {
    const updatedValue = e.target.value.replace(/ /g, "#");
    const separatedTags = updatedValue
      .split("#")
      .filter((tag) => tag.trim() !== "");

    onSetSeparatedTags(separatedTags);
    onSetInput((prev) => ({ ...prev, tags: updatedValue }));
  };

  return (
    <>
      <Form.Label>Item name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Field value"
        defaultValue={mode === "edit" ? oneItem["name"] : ""}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />
      <Form.Label>Item tags</Form.Label>
      <Form.Control
        type="text"
        value={input["tags"] || ""}
        onChange={handleTagInputChange}
      />
    </>
  );
};

export default ItemRequiredFields;
