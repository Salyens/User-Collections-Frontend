import myImage from "./picture.jpg";
import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import EditCreateModal from "../Modals/EditCreateModal";
import DeleteModal from "../Modals/DeleteModal";
import "./onecollection.css";

const CollectionCard = ({ collection, userPage }) => {
  const { name, description } = collection;
  const { theme } = useContext(ThemeContext);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const { t } = useTranslation();
  const themeClass =
    theme === "light"
      ? "bg-light text-dark"
      : "bg-dark text-white border-white";

  const handleModalToggle = () => {
    setModalShow(!modalShow);
  };

  const handleDeleteModalToggle = () => {
    setDeleteModalShow(!deleteModalShow);
  };

  return (
    <div>
      <Card className={themeClass}>
        {userPage && (
          <div className="mb-1 position-absolute top-0 end-0 edit-btn">
            
            <Button
              className="me-1"
              variant="outline-primary"
              onClick={handleModalToggle}
            >
              Edit <i className="bi bi-pencil-fill"></i>
            </Button>
            <Button variant="outline-danger" onClick={handleDeleteModalToggle}>
              Delete <i className="bi bi-trash-fill"></i>
            </Button>

          </div>
        )}
        <Card.Img src={myImage} />
        <Card.Body>
          <Card.Title className="truncate">{name}</Card.Title>
          <Card.Text className="fixed-height-text" dangerouslySetInnerHTML={{ __html: description }}></Card.Text>
          <Link
            to={`/user-collections/${name}`}
            variant="success"
            className="d-flex justify-content-center"
          >
            {t("Open-button")}
          </Link>
        </Card.Body>
      </Card>
      <EditCreateModal
        show={modalShow}
        onHide={handleModalToggle}
        collection={collection}
        mode={"edit"}
      />
      <DeleteModal
        show={deleteModalShow}
        onHide={handleDeleteModalToggle}
        collectionName={name}
      />
    </div>
  );
};

export default CollectionCard;
