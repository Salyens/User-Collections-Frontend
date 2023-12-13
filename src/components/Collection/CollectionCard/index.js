import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import EditCollectionModal from "../Modals/EditCollectionModal";
import DeleteCollectionModal from "../Modals/DeleteModal";
import CreateModalButtons from "../../Buttons/CreateModalButtons";
import "./onecollection.css";
import { UserContext } from "../../../contexts/UserContext";

const CollectionCard = ({ collection, userPage, setTotalFlag}) => {
  const { name, description, imgURL } = collection;
  const { theme } = useContext(ThemeContext);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const { user } = useContext(UserContext);
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
        {(userPage || user.role === "admin" || user.role === "root") && (
          <CreateModalButtons
            handleModalToggle={handleModalToggle}
            handleDeleteModalToggle={handleDeleteModalToggle}
          />
        )}

        <Card.Img
          src={imgURL ? imgURL : "https://via.placeholder.com/150"}
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
        setTotalFlag={setTotalFlag}
      />
    </div>
  );
};

export default CollectionCard;
