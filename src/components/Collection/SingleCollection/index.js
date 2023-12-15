import { Card, Spinner } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import SafeHTMLContent from "../SafeHTMLContent";
import "./singlecollection.css";

const SingleCollection = ({ collection }) => {
  if (!collection.data.length) return;
  const imgURL = collection.data[0].imgURL;
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const renderAdditionalFields = (fields) => {
    const fieldKeys = Object.keys(fields);
    return (
      <>
        <Card.Text>
          <strong>{t("Additional fields")}:</strong>
        </Card.Text>
        {<Card.Text>{fieldKeys.join(", ")}</Card.Text>}
      </>
    );
  };

  return (
    <div className="row m-0 mb-3">
      {collection.isLoading ? (
        <Spinner
          className="ms-auto me-auto mt-5"
          animation="border"
          size="lg"
        />
      ) : (
        <Card
          className={`${theme} col-12 col-md-6 col-lg-3 ms-auto me-auto p-0`}
        >
          <>
            <Card.Img
              src={imgURL ? imgURL : "https://via.placeholder.com/150"}
              alt="Collection Image"
            />
            <Card.Body>
              <Card.Title>{collection.data[0].name}</Card.Title>
              <SafeHTMLContent html={collection.data[0].description} />
              {collection.data[0].additionalFields &&
                renderAdditionalFields(collection.data[0].additionalFields)}
            </Card.Body>
          </>
        </Card>
      )}
    </div>
  );
};

export default SingleCollection;
