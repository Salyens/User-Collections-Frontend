import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import ApiService from "../../../../services/ApiService";
import RequiredFields from "../RequiredFields";
import renderErrors from "../../../../helpers/renderErrors";
import AdditionalFields from "../AdditionalFields";
import typeCastAdditionalFields from "../../../../helpers/modals/typeCastAdditionalFields";
import validRequiredFields from "../../../../helpers/validation/createCollection";
import { DataContext } from "../../../../contexts/DataContext";

const CreateCollectionModal = ({ show, onHide }) => {
  const { setCollections } = useContext(DataContext);
  const [input, setInput] = useState({});
  const [newFields, setNewFields] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleInputChange = (key, value) => {
    setErrors([]);
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const error = validRequiredFields(input);
      if (error) return setErrors(error);

      const { additionalFields, errors } = typeCastAdditionalFields(newFields);
      if (errors.length) return setErrors(errors);

      const formData = new FormData();
      Object.keys(input).forEach((key) => {
        if (key === "imgURL" && input.imgURL) {
          formData.append("imgURL", input.imgURL);
        } else {
          formData.append(key, input[key]);
        }
      });

      if (Object.keys(additionalFields))
        formData.append("additionalFields", JSON.stringify(additionalFields));

      const newCollection = await ApiService.createCollection(formData);
      setCollections((prevData) => ({
        ...prevData,
        total: prevData.total + 1,
        data: [...prevData.data, newCollection],
      }));

      setInput({});
      onHide();
    } catch (error) {
      console.log("error: ", error);
      !error.response
        ? setErrors(error.message)
        : setErrors(error.response.data.message);
    }
  };

  const addNewField = () => {
    setNewFields([...newFields, { type: "string", value: "" }]);
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
        <Modal.Title>Create collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderErrors(errors)}
        <Form.Group>
          <RequiredFields
            handleInputChange={handleInputChange}
            input={input}
            onSetInput={setInput}
          />

          <Button variant="primary" onClick={addNewField} className="mb-3">
            + Add new field
          </Button>

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

export default CreateCollectionModal;
