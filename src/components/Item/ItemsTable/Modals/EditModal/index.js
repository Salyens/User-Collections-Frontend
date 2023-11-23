import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import ApiService from "../../../../../services/ApiService";
import { ErrorsContext } from "../../../../../contexts/ErrorsContext";
import renderErrors from "../../../../../helpers/renderErrors";
import ItemAdditionalFields from "../ItemAdditionalFields";
import ItemRequiredFields from "../ItemRequiredFields";
import hasEmptyValues from "../../../../../helpers/validation";
import createItemValidation from "../../../../../helpers/validation/createItem";
import { ThemeContext } from "../../../../../contexts/ThemeContext";
import prepareAdditionalFields from "../../../../../helpers/prepareAdditionalFields";
import updateItemState from "../../../../../helpers/updateItem/updateItemState";

const EditModal = ({ show, onHide, oneItem, collection, onSetItems, mode }) => {
  const { errors, setErrors } = useContext(ErrorsContext);
  const [input, setInput] = useState({});
  const [separatedTags, setSeparatedTags] = useState([]);
  const [changedFields, setChangedFields] = useState({});
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light" ? "bg-light text-dark  " : "bg-dark text-white";

  useEffect(() => {
    if (mode === "edit" && oneItem) {
      setInput({
        name: oneItem.name || "",
        tags:
          Array.isArray(oneItem.tags) && oneItem.tags.length > 0
            ? "#" + oneItem.tags.join("#")
            : "#",
      });
      setSeparatedTags(oneItem.tags || []);
    } else {
      setInput({ tags: "#", name: "" });
      setSeparatedTags([]);
    }
  }, [oneItem, mode]);

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

      if (mode === "edit") {
        const isEmpty = hasEmptyValues(input, updatedAdditionalFields);
        if (isEmpty.length) return setErrors(isEmpty);
        await ApiService.updateItem(wholeItemInfo, oneItem._id);

        onSetItems((prev) =>
          prev.map((el) => updateItemState(el, wholeItemInfo, oneItem))
        );
      } else if (mode === "create") {
        const isEmpty = createItemValidation(
          collection.additionalFields,
          wholeItemInfo
        );
        if (isEmpty.length) return setErrors(isEmpty);

        const wholeItemWithCollectionName = {
          ...wholeItemInfo,
          collectionName: collection["name"],
        };

        await ApiService.createItem(wholeItemWithCollectionName);
        const itemWithDate = {
          ...wholeItemInfo,
          createdDate: Date.now(),
        };
        onSetItems((prev) => [...prev, itemWithDate]);
      }

      setInput({});
      setChangedFields({});
      onHide();
    } catch (error) {
      !error.response
        ? setErrors(error.message)
        : setErrors(error.response.data.message);
    }
  };

  const renderModalHeader = () => {
    if (mode === "edit") return `Edit ${oneItem.name}`;
    else if (mode === "create") return "Create item";
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className={themeClass}>
        <Modal.Title>{renderModalHeader()}</Modal.Title>
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
            mode={mode}
            onSetSeparatedTags={setSeparatedTags}
          />
          <ItemAdditionalFields
            collection={collection}
            mode={mode}
            onSetChangedFields={setChangedFields}
            oneItem={oneItem}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer className={themeClass}>
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

export default EditModal;
