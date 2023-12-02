import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import renderErrors from "../../../helpers/renderErrors";
import { Card, Spinner } from "react-bootstrap";
import transformToDate from "../../../helpers/transformToDate";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import useDataFetching from "../../../hooks/useDataFetching";

const SingleItemPage = () => {
  const { itemName } = useParams();
  const [error, setError] = useState("");
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light" ? "bg-light text-dark " : "bg-dark text-white";

  const [collection, setCollection] = useState({ data: [] });
  const [item, setItem] = useState({ data: [] });

  const pageParamsItems = {
    apiFunction: "getOneItem",
    limit: 12,
    userPage: false,
    setData: setItem,
    setError,
    itemName,
  };

  const pageParamsOneCollection = {
    apiFunction: "getOneCollection",
    limit: 1,
    userPage: false,
    setData: setCollection,
    setError,
    collectionName: item.data.length ? item.data[0].collectionName : null,
  };

  useDataFetching(pageParamsItems);
  useDataFetching(pageParamsOneCollection);

  const oneItem = item.data[0];
  const oneCollection = collection.data[0];

  const renderAdditionalFields = () => {
    const additionalFieldsKeys = Object.keys(oneItem["additionalFields"]);
    return additionalFieldsKeys.map((key) => {
      const fieldValue = oneItem["additionalFields"][key]["value"];
      const fieldType = oneCollection["additionalFields"][key]["type"];
      // if (typeof fieldValue === "object" && fieldValue !== null) {
      //   fieldValue = fieldValue.value; 
      // }
      if (fieldType === "date") {
        return (
          <Card.Text key={key}>
            {key}: {transformToDate(fieldValue)}
          </Card.Text>
        );
      } else if (fieldType === "boolean") {
        return (
          <Card.Text key={key}>
            {key}: {fieldValue ? "Yes" : "No"}
          </Card.Text>
        );
      }
      return (
        <Card.Text key={key}>
          {key}: {fieldValue}
        </Card.Text>
      );
    });
  };

  return (
    <div className={`${themeClass} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      {error && <div>{renderErrors(error)}</div>}
      <div className="flex-grow-1 d-flex justify-content-center ">
        {!item ? (
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
                  {oneCollection ? (
                    renderAdditionalFields()
                  ) : (
                    <Spinner
                      className="ms-auto me-auto mt-5"
                      animation="border"
                      size="lg"
                    />
                  )}
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
