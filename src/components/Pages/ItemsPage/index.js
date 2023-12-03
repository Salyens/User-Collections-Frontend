import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import { DataContext } from "../../../contexts/DataContext";
import useDataFetching from "../../../hooks/useDataFetching";
import ItemList from "../../Item/ItemList";
import CustomPagination from "../../CustomPagination";
import renderErrors from "../../../helpers/renderErrors";

const ItemsPage = ({ userPage, limit }) => {
  const { items, setItems } = useContext(DataContext);
  const [error, setError] = useState("");
  const pageParams = {
    apiFunction: "getItems",
    limit: limit.default,
    userPage,
    setData: setItems,
    setError,
  };
  const { page, setPage } = useDataFetching(pageParams);
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      <div className="flex-grow-1">
        <ErrorBoundary componentName="CustomNavBar">
          <h1 className="text-center m-3">All items</h1>
          {error && <div>{renderErrors(error)}</div>}
          <ItemList items={items} />
        </ErrorBoundary>
      </div>
      <CustomPagination
        page={page}
        limit={pageParams.limit}
        total={items.total}
        onSetPage={setPage}
      />
      <Footer className="mt-auto" />
    </div>
  );
};

export default ItemsPage;
