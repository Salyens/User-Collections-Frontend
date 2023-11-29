import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import SingleCollection from "../../Collection/SingleCollection/index.js";
import { useParams } from "react-router-dom";
import ApiService from "../../../services/ApiService.js";
import renderErrors from "../../../helpers/renderErrors.js";
import CustomPagination from "../../CustomPagination/index.js";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import ItemsTable from "../../Item/ItemsTable/ItemsTable/index.js";

const SingleCollectionPage = ({ currentLang, onSetCurrentLang, userPage=false }) => {
  const { collectionName } = useParams();
  const { t, i18n } = useTranslation();
  const [collection, setCollection] = useState({});
  const [items, setItems] = useState([]);
  const [errors, setErrors]  = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(12);
  const { theme } = useContext(ThemeContext);

  
  const handleGetCollectionInfo = async () => {
    if (!collectionName) return;
    try {
      const foundedCollection = await ApiService.getOneCollection(
        collectionName
      );
      let foundedItems;
      if (!userPage)
        foundedItems = await ApiService.getItems(page, limit, collectionName);
      else
        foundedItems = await ApiService.getItemsInCollection(
          page,
          limit,
          collectionName
        );
      setTotal(!userPage && foundedItems.total);
      setItems(userPage ? foundedItems : foundedItems.data);
      setCollection(foundedCollection);
    } catch (error) {
      setErrors(
        "We encountered an error while loading the data. Please accept our apologies for this inconvenience. Try refreshing the page or come back later."
      );
    }
  };

  useEffect(() => {
    handleGetCollectionInfo();
  }, [page]);

  return (
    <div className={`${theme} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar
          currentLang={currentLang}
          onSetCurrentLang={onSetCurrentLang}
        />
      </ErrorBoundary>

      {errors && errors.length > 0 && (
        <div className="flex-grow-1 mt-5">{renderErrors(errors)}</div>
      )}

      <div className="flex-grow-1">
        <ErrorBoundary componentName="SingleCollection">
          <SingleCollection collection={collection} />
        </ErrorBoundary>
        <ErrorBoundary componentName="ItemList">
          <ItemsTable
            collection={collection}
            items={items}
            onSetItems={setItems}
          />
        </ErrorBoundary>

        <ErrorBoundary componentName="CustomPagination">
          <CustomPagination
            page={page}
            limit={12}
            total={total}
            onSetPage={setPage}
          />
        </ErrorBoundary>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default SingleCollectionPage;
