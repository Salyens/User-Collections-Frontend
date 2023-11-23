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
  const [item, setItem] = useState([]);
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
            {/* {requiredValues.map((value) => (
              <Card.Text>{value}</Card.Text>
            ))}
            {requiredValues.map((value) => (
              <Card.Text>{value}</Card.Text>
            ))} */}
          </Card.Body>
        </Card>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default SingleItemPage;
