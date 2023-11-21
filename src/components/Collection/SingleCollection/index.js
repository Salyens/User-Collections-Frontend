import myImage from "./picture.jpg";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import "./singlecollection.css";

const SingleCollection = ({ collection }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const themeClass =
    theme === "light"
      ? "bg-light text-dark col-12 col-md-6 col-lg-3 ms-auto me-auto p-0  "
      : "bg-dark text-white border-white col-12 col-md-6 col-lg-3 ms-auto me-auto p-0 ";

  const renderAdditionalFields = (fields) => {
    const fieldKeys = Object.keys(fields);
    return (
      <>
        <Card.Text>
          <strong>Additional Fields:</strong>
        </Card.Text>
        {<Card.Text>{fieldKeys.join(", ")}</Card.Text>}
      </>
    );
  };

  return (
    <div className="row m-0 mb-3">
      <Card className={themeClass}>
        <Card.Img src={myImage} />
        <Card.Body>
          <Card.Title>{collection.name}</Card.Title>
          <Card.Text
            dangerouslySetInnerHTML={{ __html: collection.description }}
          ></Card.Text>
          {collection.additionalFields &&
            renderAdditionalFields(collection.additionalFields)}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleCollection;
