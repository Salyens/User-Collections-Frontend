import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import ApiService from "../../../../services/ApiService";
import { ErrorsContext } from "../../../../contexts/ErrorsContext";
import RequiredFields from "../RequiredFields";
import renderErrors from "../../../../helpers/renderErrors";
import AdditionalFields from "../AdditionalFields";

const EditCollectionModal = ({ show, onHide, collection, onSetData }) => {
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
      await ApiService.updateCollection(input, collection._id);

      onSetData((prev) =>
        prev.map((el) =>
          el._id === collection._id ? { ...el, ...input } : el
        )
      );

      setInput({});
      onHide();
    } catch (error) {
      !error.response
        ? setErrors(error.message)
        : setErrors(error.response.data.message);
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
        <Modal.Title>Edit collection</Modal.Title>
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

export default EditCollectionModal;
