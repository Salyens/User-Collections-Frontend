import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import ApiService from "../../../../services/ApiService";
import RequiredFields from "../RequiredFields";
import renderErrors from "../../../../helpers/renderErrors";
import AdditionalFields from "../AdditionalFields";
import { DataContext } from "../../../../contexts/DataContext";

const EditCollectionModal = ({ show, onHide, collection }) => {
  const { setCollections } = useContext(DataContext);
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState({});
  const [newFields, setNewFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (key, value) => {
    setErrors([]);
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.keys(input).forEach((key) => {
        if (key === "imgURL" && input.imgURL) {
          formData.append("imgURL", input.imgURL);
        } else {
          formData.append(key, input[key]);
        }
      });

      const updatedCollection = await ApiService.updateCollection(
        formData,
        collection._id
      );
      const updateCollectionState = () => {
        setCollections((prevData) => ({
          ...prevData,
          data: prevData.data.map((el) =>
            el._id === collection._id ? { ...el, ...updatedCollection } : el
          ),
        }));
      };
      updateCollectionState();
      setIsLoading(false);
      setInput({});
      onHide(false);
    } catch (error) {
      setIsLoading(false);
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
          {isLoading ? <Spinner animation="border" size="sm" /> : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCollectionModal;
