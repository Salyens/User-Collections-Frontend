import { ThemeContext } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import renderErrors from "../../../../../helpers/renderErrors";
import ItemAdditionalFields from "../ItemAdditionalFields";
import ItemRequiredFields from "../ItemRequiredFields";
import prepareAdditionalFields from "../../../../../helpers/prepareAdditionalFields";
import { useTranslation } from "react-i18next";

const CommonItemModal = ({
  collection,
  show,
  onSetModalEditShow,
  oneItem,
  params,
  handleSaveChanges,
  onHide,
}) => {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);

  const [separatedTags, setSeparatedTags] = useState([]);
  const [changedFields, setChangedFields] = useState({});
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light" ? "bg-light text-dark  " : "bg-dark text-white";
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    params.mode === "create"
      ? setInput({ tags: "#", name: "" })
      : setInput({
          name: oneItem.name || "",
          tags:
            Array.isArray(oneItem.tags) && oneItem.tags.length > 0
              ? "#" + oneItem.tags.join("#")
              : "#",
        });

    setSeparatedTags(oneItem.tags || []);
  }, [oneItem]);

  useEffect(() => {
    if (!show) {
      setErrors([]);
      setInput({});
    }
  }, [show]);

  const buildItemData = () => {
    const updatedAdditionalFields = prepareAdditionalFields(
      changedFields,
      collection
    );
    const wholeItemInfo = {
      ...input,
      additionalFields: updatedAdditionalFields,
      tags: separatedTags,
    };
    return { wholeItemInfo, updatedAdditionalFields };
  };

  return (
    <Modal show={show} onHide={() => onHide(onSetModalEditShow)} centered>
      <Modal.Header closeButton className={themeClass}>
        <Modal.Title>{params.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={themeClass}>
        {renderErrors(errors)}
        <Form.Group>
          <ItemRequiredFields
            oneItem={oneItem}
            input={input}
            onSetInput={setInput}
            mode={params.mode}
            onSetSeparatedTags={setSeparatedTags}
          />
          <ItemAdditionalFields
            collection={collection}
            mode={params.mode}
            onSetChangedFields={setChangedFields}
            oneItem={oneItem}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer className={themeClass}>
        <Button variant="secondary" onClick={() => onHide(onSetModalEditShow)}>
          {t("Close")}
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            handleSaveChanges(
              buildItemData,
              setIsLoading,
              setErrors,
              setChangedFields,
              input
            )
          }
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : t("Save")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommonItemModal;
