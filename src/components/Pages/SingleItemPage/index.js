import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import renderErrors from "../../../helpers/renderErrors";
import { ErrorsContext } from "../../../contexts/ErrorsContext";
import ApiService from "../../../services/ApiService";
import { Card } from "react-bootstrap";
import transformToDate from "../../../helpers/transformToDate";

const SingleItemPage = ({ currentLang, onSetCurrentLang }) => {
  const { itemName } = useParams();
  const { errors, setErrors } = useContext(ErrorsContext);
  const [item, setItem] = useState({});
  const [collection, setCollection] = useState({});

  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light" ? "bg-light text-dark " : "bg-dark text-white";

  const handleGetItemInfo = async () => {
    try {
      const foundedItem = await ApiService.getOneItem(itemName);
      const foundedCollection = await ApiService.getOneCollection(
        foundedItem["collectionName"]
      );
      setCollection(foundedCollection);
      setItem(foundedItem);
    } catch (error) {
      setErrors(
        "We encountered an error while loading the data. Please accept our apologies for this inconvenience. Try refreshing the page or come back later."
      );
    }
  };

  useEffect(() => {
    handleGetItemInfo();
  }, []);

  const renderAdditionalFields = () => {
    if (!item || Object.keys(item).length === 0) {
      return <div>Loading...</div>;
    }

    const additionalFieldsKeys = Object.keys(item["additionalFields"]);
    return additionalFieldsKeys.map((key) => {
      const fieldValue = item["additionalFields"][key]["value"];
      const fieldType = collection["additionalFields"][key]["type"];
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
      <CustomNavBar
        currentLang={currentLang}
        onSetCurrentLang={onSetCurrentLang}
      />
      {errors && errors.length > 0 && <div>{renderErrors(errors)}</div>}
      <div className="flex-grow-1 d-flex justify-content-center ">
        <div className="mt-5">
          <Card style={{width:300}}>
            <Card.Body className={themeClass}>
              <Card.Title>Item name: {item.name}</Card.Title>
              <Card.Text className="">
                Collection: {item.collectionName}
              </Card.Text>
              <Card.Text>
                Created date: {transformToDate(item.createdDate)}
              </Card.Text>
              <Card.Text>Tags: {item.tags}</Card.Text>
              {renderAdditionalFields()}
            </Card.Body>
          </Card>
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default SingleItemPage;
