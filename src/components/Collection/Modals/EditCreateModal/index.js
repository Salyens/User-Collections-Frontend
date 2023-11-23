import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import ApiService from "../../../../services/ApiService";
import { ErrorsContext } from "../../../../contexts/ErrorsContext";
import RequiredFields from "../RequiredFields";
import renderErrors from "../../../../helpers/renderErrors";
import AdditionalFields from "../AdditionalFields";
import { DataContext } from "../../../../contexts/DataContext";


const EditCreateModal = ({ show, onHide, collection, mode }) => {
  const { setData } = useContext(DataContext);
  const [input, setInput] = useState({});
  const [newFields, setNewFields] = useState([]);
  const { errors, setErrors } = useContext(ErrorsContext);

  const handleInputChange = (key, value) => {
    setErrors([]);
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      if (
        mode === "create" &&
        (!input["name"] || !input["description"] || !input["theme"])
      ) {
        return setErrors(["Name, description and theme shouldn't be empty"]);
      }

      const additionalFields = newFields.reduce((acc, field) => {
        if (field.type && field.value) {
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
        return acc;
      }, {});

      const finalInput = {
        ...input,
        additionalFields,
      };

      if (mode === "edit") {
        await ApiService.updateCollection(finalInput, collection._id);
        setData((prev) =>
          prev.map((el) =>
            el._id === collection._id ? { ...el, ...finalInput } : el
          )
        );
      } else if (mode === "create") {
        const newCollection = await ApiService.createCollection(finalInput);
        setData((prev) => [...prev, newCollection]);
      }
      setInput({});
      onHide();
    } catch (error) {
      !error.response
        ? setErrors(error.message)
        : setErrors(error.response.data.message);
    }
  };

  const addNewField = () => {
    setNewFields([...newFields, { type: "string", value: "" }]);
  };

  const renderTitle = () => {
    if (mode === "edit") {
      return collection ? `Edit ${collection.name}` : "Edit collection";
    }
    if (mode === "create") {
      return "Create collection";
    }
  };

  useEffect(() => {
    if (!show) {
      setErrors([]);
      setNewFields([]);
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{renderTitle()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderErrors(errors)}
        <Form.Group>
          <RequiredFields
            collection={collection}
            handleInputChange={handleInputChange}
            input={input}
            onSetInput={setInput}
          />
          {mode === "create" && (
            <Button variant="primary" onClick={addNewField} className="mb-3">
              + Add new field
            </Button>
          )}
          <AdditionalFields
            newFields={newFields}
            onSetNewFields={setNewFields}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCreateModal;
