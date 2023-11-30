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
import useDataFetching from "../../../hooks/useDataFetching.js";
import { DataContext } from "../../../contexts/DataContext.js";

const SingleCollectionPage = () => {
  const { collectionName } = useParams();
  const { t, i18n } = useTranslation();
  const [errors, setErrors] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(12);
  const { theme } = useContext(ThemeContext);

  const { collections, setCollections, items, setItems } =
    useContext(DataContext);
  const pageParamsOneCollection = {
    apiFunction: "getOneCollection",
    limit: 12,
    userPage: false,
    setData: setCollections,
    isCollection: true,
    collectionName,
  };
  const pageParamsItems = {
    apiFunction: "getItemsInCollection",
    limit: 12,
    userPage: false,
    setData: setItems,
    isItem: true,
    collectionName,
  };

  useDataFetching(pageParamsOneCollection);
  useDataFetching(pageParamsItems);

  return (
    <div className={`${theme} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      {errors && errors.length > 0 && (
        <div className="flex-grow-1 mt-5">{renderErrors(errors)}</div>
      )}

      <div className="flex-grow-1">
        <ErrorBoundary componentName="SingleCollection">
          <SingleCollection collection={collections} />
        </ErrorBoundary>
        <ErrorBoundary componentName="ItemList">
          <ItemsTable
            collection={collections.data[0]}
            items={items.data}
            onSetItems={setItems}
          />
        </ErrorBoundary>

        {/* <ErrorBoundary componentName="CustomPagination">
          <CustomPagination
            page={page}
            limit={12}
            total={items.total}
            onSetPage={setPage}
          />
        </ErrorBoundary> */}
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default SingleCollectionPage;
