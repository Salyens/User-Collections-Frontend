import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import ApiService from "../../../../../services/ApiService";
import renderErrors from "../../../../../helpers/renderErrors";
import ItemAdditionalFields from "../ItemAdditionalFields";
import ItemRequiredFields from "../ItemRequiredFields";
import createItemValidation from "../../../../../helpers/validation/createItem";
import { ThemeContext } from "../../../../../contexts/ThemeContext";
import prepareAdditionalFields from "../../../../../helpers/prepareAdditionalFields";

const CreateItemModal = ({
  show,
  onHide,
  oneItem,
  collection,
  onSetItems,
  onSetModalCreateShow,
}) => {
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState({});
  const [separatedTags, setSeparatedTags] = useState([]);
  const [changedFields, setChangedFields] = useState({});
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light" ? "bg-light text-dark  " : "bg-dark text-white";
  const [createLoading, setCreateLoading] = useState(false);
  useEffect(() => {
    setInput({ tags: "#", name: "" });
    setSeparatedTags([]);
  }, [oneItem]);

  const handleSaveChanges = async () => {
    try {
      const updatedAdditionalFields = prepareAdditionalFields(
        changedFields,
        collection
      );

      const wholeItemInfo = {
        ...input,
        additionalFields: updatedAdditionalFields,
        tags: separatedTags,
      };

      setCreateLoading(true);
      const isEmpty = createItemValidation(
        collection.additionalFields,
        wholeItemInfo
      );
      if (isEmpty.length) {
        setCreateLoading(false);
        return setErrors(isEmpty);
      }

      const wholeItemWithCollectionName = {
        ...wholeItemInfo,
        collectionName: collection["name"],
      };

      const newItem = await ApiService.createItem(wholeItemWithCollectionName);
      const itemWithDateAndId = {
        ...wholeItemInfo,
        createdDate: Date.now(),
        _id: newItem._id,
      };

      setCreateLoading(false);
      onSetItems((prevData) => ({
        ...prevData,
        data: [...prevData.data, itemWithDateAndId],
      }));

      setChangedFields({});
      onHide(onSetModalCreateShow);
    } catch (error) {
      setCreateLoading(false);
      !error.response
        ? setErrors(error.message)
        : setErrors(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!show) {
      setErrors([]);
      setInput({});
    }
  }, [show]);

  return (
    <Modal show={show} onHide={() => onHide(onSetModalCreateShow)} centered>
      <Modal.Header closeButton className={themeClass}>
        <Modal.Title>Create item</Modal.Title>
      </Modal.Header>
      <Modal.Body className={themeClass}>
        {renderErrors(errors)}
        <Form.Group>
          <ItemRequiredFields
            oneItem={oneItem}
            handleInputChange
            handleTagInputChange
            input={input}
            onSetInput={setInput}
            mode="create"
            onSetSeparatedTags={setSeparatedTags}
          />
          <ItemAdditionalFields
            collection={collection}
            mode="create"
            onSetChangedFields={setChangedFields}
            oneItem={oneItem}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer className={themeClass}>
        <Button
          variant="secondary"
          onClick={() => onHide(onSetModalCreateShow)}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          {createLoading ? <Spinner animation="border" size="sm" /> : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateItemModal;
