import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import SingleCollection from "../../Collection/SingleCollection/index.js";
import ItemList from "../../Item/ItemsTable/ItemList/index.js";
import { useParams } from "react-router-dom";
import ApiService from "../../../services/ApiService.js";
import { ErrorsContext } from "../../../contexts/ErrorsContext.js";
import renderErrors from "../../../helpers/renderErrors.js";

const SingleCollectionPage = ({ currentLang, onSetCurrentLang }) => {
  const { collectionName } = useParams();
  const { t, i18n } = useTranslation();
  const [collection, setCollection] = useState({});
  const [items, setItems] = useState([]);
  const { errors, setErrors } = useContext(ErrorsContext);
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-light text-dark d-flex flex-column min-vh-100"
      : "bg-dark text-white d-flex flex-column min-vh-100";

  const handleGetCollectionInfo = async () => {
    try {
      const foundedCollection = await ApiService.getOneCollection(
        collectionName
      );
      const foundedItems = await ApiService.getItemsInCollection(
        collectionName
      );
      setItems(foundedItems);
      setCollection(foundedCollection);
    } catch (error) {
      setErrors(
        "We encountered an error while loading the data. Please accept our apologies for this inconvenience. Try refreshing the page or come back later."
      );
    }
  };

  useEffect(() => {
    handleGetCollectionInfo();
  }, [setItems]);

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
        <SingleCollection
          onSetItems={setItems}
          collection={collection}
          onSetCollection={setCollection}
        />
        <ItemList collection={collection} items={items} onSetItems={setItems} />
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default SingleCollectionPage;
