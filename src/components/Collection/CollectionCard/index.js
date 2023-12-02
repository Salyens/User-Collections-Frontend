import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import EditCollectionModal from "../Modals/EditCollectionModal";
import DeleteCollectionModal from "../Modals/DeleteModal";
import "./onecollection.css";
import CreateModalButtons from "../../Buttons/CreateModalButtons";

const CollectionCard = ({ collection, userPage }) => {
  const { name, description } = collection;
  const { theme } = useContext(ThemeContext);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const { t } = useTranslation();
  const handleModalToggle = () => {
    setModalShow(!modalShow);
  };

  const handleDeleteModalToggle = () => {
    setDeleteModalShow(!deleteModalShow);
  };

  return (
    <div>
      <Card className={theme}>
        {userPage && (
          <CreateModalButtons
            handleModalToggle={handleModalToggle}
            handleDeleteModalToggle={handleDeleteModalToggle}
          />
        )}

        <Card.Img
          src="https://via.placeholder.com/150"
          alt="Collection Image"
        />
        <Card.Body>
          <Card.Title className="truncate">{name}</Card.Title>
          <Card.Text
            className="fixed-height-text"
            dangerouslySetInnerHTML={{ __html: description }}
          ></Card.Text>
          <Link
            to={userPage ? `/user-collections/${name}` : `/collections/${name}`}
            className="d-flex justify-content-center btn btn-success"
          >
            {t("Open-button")}
          </Link>
        </Card.Body>
      </Card>
      <EditCollectionModal
        show={modalShow}
        onHide={handleModalToggle}
        collection={collection}
      />
      <DeleteCollectionModal
        show={deleteModalShow}
        onHide={handleDeleteModalToggle}
        collectionName={name}
      />
    </div>
  );
};

export default CollectionCard;
