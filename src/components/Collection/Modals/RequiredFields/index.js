import { Form } from "react-bootstrap";
import ThemeDropdown from "../../DropDowns/ThemeDropDown";
import UploadImg from "../UploadImg";
import DescriptionEditor from "../DescriptionEditor";
import "./requiredfields.css";

const RequiredFields = ({ collection, handleInputChange, onSetInput }) => {
  return (
    <div className="mb-3">
      <Form.Label>Collection name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter collection name"
        defaultValue={collection ? collection["name"] : ""}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />
      <Form.Label>Collection description</Form.Label>
      <DescriptionEditor
        handleInputChange={handleInputChange}
        prevValue={collection ? collection["description"] : ""}
      />
      <Form.Label>Collection theme</Form.Label>
      <ThemeDropdown
        collectionKey="theme"
        onSetInput={onSetInput}
        prevValue={collection ? collection["theme"] : ""}
      />
      <UploadImg onSetInput={onSetInput} />
    </div>
  );
};

export default RequiredFields;
