import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import ApiService from "../../../../../services/ApiService";
import convertDateToTimestamp from "../../../../../helpers/date/convertDateToTimestamp";
import { ErrorsContext } from "../../../../../contexts/ErrorsContext";
import renderErrors from "../../../../../helpers/renderErrors";
import ItemAdditionalFields from "../ItemAdditionalFields";
import ItemRequiredFields from "../ItemRequiredFields";

const EditModal = ({ show, onHide, oneItem, collection, onSetItems, mode }) => {
  const { errors, setErrors } = useContext(ErrorsContext);
  const [input, setInput] = useState({});
  const [separatedTags, setSeparatedTags] = useState([]);
  const [changedFields, setChangedFields] = useState({});

  const handleSaveChanges = async () => {
    const updatedAdditionalFields = {};
    Object.keys(changedFields).forEach((fieldName) => {
      const field = collection["additionalFields"][fieldName];
      let value = changedFields[fieldName].value;

      console.log("value: ", value);
      console.log(field.type);
      if (field.type === "number") {
        value = Number(value);
      }
      if (field.type === "date") {
        value = convertDateToTimestamp(value);
      }
      console.log("new", value);

      updatedAdditionalFields[fieldName] = {
        ...changedFields[fieldName],
        value,
      };
    });

    // const isEmptyValue = hasEmptyValues(input);
    // if (isEmptyValue) return setErrors([isEmptyValue]);

    const wholeItemInfo = {
      ...input,
      additionalFields: updatedAdditionalFields,
      tags: separatedTags,
    };
    console.log("wholeItemInfo: ", wholeItemInfo);
    if (mode === "edit") {
      wholeItemInfo;
      await ApiService.updateItem(wholeItemInfo, oneItem._id);

      onSetItems((prev) =>
        prev.map((el) =>
          el._id === oneItem._id
            ? {
                ...el,
                ...wholeItemInfo,
                additionalFields: {
                  ...el.additionalFields,
                  ...wholeItemInfo.additionalFields,
                },
              }
            : el
        )
      );
    } else if (mode === "create") {
      try {
        const wholeItemWithCollectionName = {
          ...wholeItemInfo,
          collectionName: collection["name"],
        };
        await ApiService.createItem(wholeItemWithCollectionName);
        onSetItems((prev) => [...prev, wholeItemInfo]);
      } catch (error) {
        setErrors(error);
      }
    }

    setInput({});
    onHide();
  };

  const renderModalHeader = () => {
    if (mode === "edit") return `Edit ${oneItem.name}`;
    else if (mode === "create") return "Create item";
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{renderModalHeader()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

export default EditModal;
