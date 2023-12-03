import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import renderErrors from "../../../helpers/renderErrors";
import { Card, Spinner } from "react-bootstrap";
import transformToDate from "../../../helpers/transformToDate";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import useDataFetching from "../../../hooks/useDataFetching";
import ItemAdditionalFields from "../../Item/ItemAdditionalFields";

const SingleItemPage = ({ userPage, limit }) => {
  const { itemName } = useParams();
  const [error, setError] = useState("");
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light" ? "bg-light text-dark " : "bg-dark text-white";

  const [collection, setCollection] = useState({
    data: [],
    total: 0,
    isLoading: true,
  });
  const [item, setItem] = useState({ data: [], total: 0, isLoading: true });

  const pageParamsItems = {
    apiFunction: "getOneItem",
    limit: limit.default,
    userPage,
    setData: setItem,
    setError,
    itemName,
  };

  const pageParamsOneCollection = {
    apiFunction: "getOneCollection",
    limit: limit.default,
    userPage,
    setData: setCollection,
    setError,
    collectionName: item.data.length ? item.data[0].collectionName : null,
  };

  useDataFetching(pageParamsItems);
  useDataFetching(pageParamsOneCollection);

  const oneItem = item.data[0];
  const oneCollection = collection.data[0];

  return (
    <div className={`${themeClass} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      {error && <div>{renderErrors(error)}</div>}
      <div className="flex-grow-1 d-flex justify-content-center ">
        {item.isLoading ? (
          <Spinner
            className="ms-auto me-auto mt-5"
            animation="border"
            size="lg"
          />
        ) : (
          <div className="mt-5">
            <ErrorBoundary componentName="Card">
              <Card style={{ width: 300 }}>
                <Card.Body className={themeClass}>
                  <Card.Title>Item name: {oneItem?.name}</Card.Title>
                  <Card.Text>Collection: {oneItem?.collectionName}</Card.Text>
                  <Card.Text>
                    Created date: {transformToDate(oneItem?.createdDate)}
                  </Card.Text>
                  <Card.Text>Tags: {oneItem?.tags}</Card.Text>
                  <ItemAdditionalFields
                    item={oneItem}
                    collection={oneCollection}
                  />
                </Card.Body>
              </Card>
            </ErrorBoundary>
          </div>
        )}
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default SingleItemPage;
