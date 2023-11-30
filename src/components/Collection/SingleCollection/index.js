import { Card, Spinner } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import "./singlecollection.css";

const SingleCollection = ({ collection }) => {
  const { theme } = useContext(ThemeContext);

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
      {collection.isLoading ? (
        <Spinner className="ms-auto me-auto mt-5" animation="border" size="lg" />
      ) : (
        <Card
          className={`${theme} col-12 col-md-6 col-lg-3 ms-auto me-auto p-0`}
        >
          <>
            <Card.Img
              src="https://via.placeholder.com/150"
              alt="Collection Image"
            />
            <Card.Body>
              <Card.Title>{collection.data[0].name}</Card.Title>
              <Card.Text
                dangerouslySetInnerHTML={{
                  __html: collection.data[0].description,
                }}
              ></Card.Text>
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
