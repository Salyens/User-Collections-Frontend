import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import renderErrors from "../../../helpers/renderErrors";
import { ErrorsContext } from "../../../contexts/ErrorsContext";
import ApiService from "../../../services/ApiService";
import { Card } from "react-bootstrap";

const SingleItemPage = ({ currentLang, onSetCurrentLang }) => {
  const { itemName } = useParams();
  const { errors, setErrors } = useContext(ErrorsContext);
  const [item, setItem] = useState({});
  // if (!Object.keys(item).length) return "Loading";
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light" ? "light d-flex flex-column " : "dark d-flex flex-column";

  //   const { name, collectionName, createdDate, tags, user, ...rest } = item;

  //   userName = user["name"]
  //   console.log('userName: ', userName);
  //   const requiredValues = [name, collectionName, createdDate, tags];
  //   const additionalFieldsKeys = Object.keys(item["additionalFields"])
  //   console.log('additionalFieldsKeys: ', additionalFieldsKeys);

  const handleGetItemInfo = async () => {
    try {
      const foundedItem = await ApiService.getOneItem(itemName);
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

  // const additionalFieldsKeys = item.additionalFields
  //   ? Object.keys(item.additionalFields)
  //   : [];

  return (
    <div className={themeClass}>
      <CustomNavBar
        currentLang={currentLang}
        onSetCurrentLang={onSetCurrentLang}
      />
      {errors && errors.length > 0 && (
        <div className="flex-grow-1 mt-5">{renderErrors(errors)}</div>
      )}
      <div className="flex-grow-1">
        <Card className={themeClass}>
          <Card.Body className="d-flex flex-column justify-content-between fs-6">
            {/* {requiredFields.map((itemField) => (
              <Card.Text>{item[itemField]}</Card.Text>
            ))} */}
            <Card.Title>Item name: {item.name}</Card.Title>
            <Card.Text>Collection: {item.collectionName}</Card.Text>
            <Card.Text>Created date: {item.createdDate}</Card.Text>
            <Card.Text>Tags: {item.tags}</Card.Text>
            {/* {Object.keys(item).length > 0 &&
              additionalFieldsKeys.map((field) => (
                <Card.Text>
                  {field}: {item[field]["value"]}
                </Card.Text>
              ))} */}
          </Card.Body>
        </Card>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default SingleItemPage;
