import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import ApiService from "../../../../../services/ApiService";
import renderErrors from "../../../../../helpers/renderErrors";
import ItemAdditionalFields from "../ItemAdditionalFields";
import ItemRequiredFields from "../ItemRequiredFields";
import hasEmptyValues from "../../../../../helpers/validation";
import createItemValidation from "../../../../../helpers/validation/createItem";
import { ThemeContext } from "../../../../../contexts/ThemeContext";
import prepareAdditionalFields from "../../../../../helpers/prepareAdditionalFields";
import updateItemState from "../../../../../helpers/updateItem/updateItemState";

const EditModal = ({
  show,
  onHide,
  oneItem,
  collection,
  onSetItems,
  mode,
  errors,
  onSetErrors,
}) => {
  const [input, setInput] = useState({});
  const [separatedTags, setSeparatedTags] = useState([]);
  const [changedFields, setChangedFields] = useState({});
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light" ? "bg-light text-dark  " : "bg-dark text-white";
  const [editLoading, setEditLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
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
        setCreateLoading(true);
        const isEmpty = hasEmptyValues(input, updatedAdditionalFields);
        if (isEmpty.length) return onSetErrors(isEmpty);
        await ApiService.updateItem(wholeItemInfo, oneItem._id);
        setCreateLoading(false);
        onSetItems((prevData) => ({
          ...prevData,
          data: prevData.data.map((el) =>
            updateItemState(el, wholeItemInfo, oneItem)
          ),
        }));
      } else if (mode === "create") {
        setCreateLoading(true);
        const isEmpty = createItemValidation(
          collection.additionalFields,
          wholeItemInfo
        );
        if (isEmpty.length) {
          setCreateLoading(false);
          return onSetErrors(isEmpty);
        }

        const wholeItemWithCollectionName = {
          ...wholeItemInfo,
          collectionName: collection["name"],
        };

        await ApiService.createItem(wholeItemWithCollectionName);
        const itemWithDate = {
          ...wholeItemInfo,
          createdDate: Date.now(),
        };
        setCreateLoading(false);
        onSetItems((prevData) => ({
          ...prevData,
          data: [...prevData.data, itemWithDate],
        }));
      }

      setInput({});
      setChangedFields({});
      onHide();
    } catch (error) {
      setCreateLoading(false);
      !error.response
        ? onSetErrors(error.message)
        : onSetErrors(error.response.data.message);
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
          {createLoading ? <Spinner animation="border" size="sm" /> : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
