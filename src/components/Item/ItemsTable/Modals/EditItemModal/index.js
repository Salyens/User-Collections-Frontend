import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import ApiService from "../../../../../services/ApiService";
import renderErrors from "../../../../../helpers/renderErrors";
import ItemAdditionalFields from "../ItemAdditionalFields";
import ItemRequiredFields from "../ItemRequiredFields";
import hasEmptyValues from "../../../../../helpers/validation";
import { ThemeContext } from "../../../../../contexts/ThemeContext";
import prepareAdditionalFields from "../../../../../helpers/prepareAdditionalFields";
import updateItemState from "../../../../../helpers/updateItem/updateItemState";

const EditItemModal = ({
  show,
  onHide,
  oneItem,
  collection,
  onSetItems,
  onSetModalEditShow,
}) => {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const [separatedTags, setSeparatedTags] = useState([]);
  const [changedFields, setChangedFields] = useState({});
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light" ? "bg-light text-dark  " : "bg-dark text-white";
  const [editLoading, setEditLoading] = useState(false);
  useEffect(() => {
    setInput({
      name: oneItem.name || "",
      tags:
        Array.isArray(oneItem.tags) && oneItem.tags.length > 0
          ? "#" + oneItem.tags.join("#")
          : "#",
    });
    setSeparatedTags(oneItem.tags || []);
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

      setEditLoading(true);
      const isEmpty = hasEmptyValues(input, updatedAdditionalFields);
      if (isEmpty.length) {
        setEditLoading(false);
        return setErrors(isEmpty);
      }
      await ApiService.updateItem(wholeItemInfo, oneItem._id);

      onSetItems((prevData) => ({
        ...prevData,
        data: prevData.data.map((el) =>
          updateItemState(el, wholeItemInfo, oneItem)
        ),
      }));
      setEditLoading(false);
      onHide(onSetModalEditShow);
    } catch (error) {
      setEditLoading(false);
      !error.response
        ? setErrors(error.message)
        : setErrors(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!show) {
      setErrors([]);
      setInput({});
      setChangedFields({});
    }
  }, [show]);

  return (
    <Modal show={show} onHide={() => onHide(onSetModalEditShow)} centered>
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
            mode="edit"
            onSetSeparatedTags={setSeparatedTags}
          />
          <ItemAdditionalFields
            collection={collection}
            mode="edit"
            onSetChangedFields={setChangedFields}
            oneItem={oneItem}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer className={themeClass}>
        <Button variant="secondary" onClick={() => onHide(onSetModalEditShow)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          {editLoading ? <Spinner animation="border" size="sm" /> : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditItemModal;
