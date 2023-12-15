import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ApiService from "../../../../services/ApiService";
import renderErrors from "../../../../helpers/renderErrors";
import { useContext, useState } from "react";
import { DataContext } from "../../../../contexts/DataContext";
import { useTranslation } from "react-i18next";

const DeleteCollectionModal = ({
  show,
  onHide,
  collectionName,
  setTotalFlag,
}) => {
  const { setCollections } = useContext(DataContext);
  const [errors, setErrors] = useState([]);
  const { t } = useTranslation();

  const handleDeleteCollection = async () => {
    try {
      await ApiService.deleteCollection(collectionName);
      const updateCollectionState = () => {
        setCollections((prevData) => {
          return {
            ...prevData,
            data: prevData.data.filter(
              (collection) => collection.name !== collectionName
            ),
            total: prevData.total - 1,
          };
        });
      };

      updateCollectionState();
      setTotalFlag((prev) => !prev);
      onHide();

    } catch (error) {
      !error.response
        ? setErrors(error.message)
        : setErrors(error.response.data.message);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("Deleting collection")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {renderErrors(errors)}
          {!errors ||
            (errors.length === 0 && (
              <p>{`${t("Do delete")} "${collectionName}"?`}</p>
            ))}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t("No")}
          </Button>
          <Button variant="primary" onClick={handleDeleteCollection}>
          {t("Yes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteCollectionModal;
