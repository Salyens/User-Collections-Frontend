import React, { useEffect, useState } from "react";
import renderErrors from "../../../../helpers/renderErrors";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import RequiredFields from "../RequiredFields";
import AdditionalFields from "../AdditionalFields";

const CommonCollectionModal = ({
  show,
  onHide,
  handleSaveChanges,
  params,
  collection,
}) => {
  const [errors, setErrors] = useState([]);
  const [newFields, setNewFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({});

  const handleInputChange = (key, value) => {
    setErrors([]);
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!show) {
      setErrors([]);
      setNewFields([]);
    }
  }, [show]);

  const addNewField = () => {
    setNewFields([...newFields, { type: "string", value: "" }]);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{params.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderErrors(errors)}
        <Form.Group>
          <RequiredFields
            handleInputChange={handleInputChange}
            input={input}
            onSetInput={setInput}
            collection={collection}
          />
          {params.button && (
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
        <Button
          variant="primary"
          onClick={() =>
            handleSaveChanges(
              input,
              setInput,
              setIsLoading,
              setErrors,
              newFields
            )
          }
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommonCollectionModal;
