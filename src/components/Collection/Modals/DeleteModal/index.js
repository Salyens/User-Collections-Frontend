import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ApiService from "../../../../services/ApiService";
import renderErrors from "../../../../helpers/renderErrors";
import { useContext } from "react";
import { ErrorsContext } from "../../../../contexts/ErrorsContext";

const DeleteCollectionModal = ({ show, onHide, collectionName, onSetData }) => {
  const { errors, setErrors } = useContext(ErrorsContext);
  const handleDeleteCollection = async () => {
    try {
      await ApiService.deleteCollection(collectionName);
      onSetData((prev) =>
        prev.filter((collection) => collection.name !== collectionName)
      );
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
          <Modal.Title>Deleting collection</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {renderErrors(errors)}
          {!errors || errors.length === 0 && (
            <p>{`Are you sure you want to delete ${collectionName}?`}</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            No
          </Button>
          <Button variant="primary" onClick={handleDeleteCollection}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteCollectionModal;
