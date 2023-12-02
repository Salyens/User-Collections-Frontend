import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import SingleCollection from "../../Collection/SingleCollection/index.js";
import { useParams } from "react-router-dom";
import renderErrors from "../../../helpers/renderErrors.js";
import CustomPagination from "../../CustomPagination/index.js";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import ItemsTable from "../../Item/ItemsTable/ItemsTable/index.js";
import useDataFetching from "../../../hooks/useDataFetching.js";
import { DataContext } from "../../../contexts/DataContext.js";
import ItemList from "../../Item/ItemList/index.js";

const SingleCollectionPage = ({ userPage }) => {
  const { collectionName } = useParams();
  const [errors, setErrors] = useState([]);
  const [limit, setLimit] = useState(12);
  const { theme } = useContext(ThemeContext);
  const { collections, setCollections, items, setItems } =
    useContext(DataContext);

  const pageParamsOneCollection = {
    apiFunction: "getOneCollection",
    limit: 12,
    userPage,
    setData: setCollections,
    collectionName,
  };
  const pageParamsItems = {
    apiFunction: "getItems",
    limit: 12,
    userPage,
    setData: setItems,
    collectionName,
  };

  useDataFetching(pageParamsOneCollection);
  const { page, setPage } = useDataFetching(pageParamsItems);

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
        {userPage ? (
          <ErrorBoundary componentName="ItemList">
            <ItemsTable />
          </ErrorBoundary>
        ) : (
          <>
            <ErrorBoundary componentName="CustomPagination">
              <ItemList items={items}/>
            </ErrorBoundary>

            <ErrorBoundary componentName="CustomPagination">
              <CustomPagination
                page={page}
                limit={limit}
                total={items.total}
                onSetPage={setPage}
              />
            </ErrorBoundary>
          </>
        )}
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default SingleCollectionPage;
