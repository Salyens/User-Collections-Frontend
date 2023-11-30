import React from "react";
import { Form } from "react-bootstrap";
import ThemeDropdown from "../../DropDowns/ThemeDropDown";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

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
      <ReactQuill
        onChange={(value) => handleInputChange("description", value)}
      />
      <Form.Label>Collection theme</Form.Label>
      <ThemeDropdown
        collectionKey="theme"
        onSetInput={onSetInput}
        prevValue={collection ? collection["theme"] : ""}
      />
    </div>
  );
};

export default RequiredFields;
