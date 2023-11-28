import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import { DataContext } from "../../../contexts/DataContext";
import useDataFetching from "../../../hooks/useDataFetching";
import ItemList from "../../Item/ItemList";
import CustomPagination from "../../CustomPagination";

const ItemsPage = () => {
  const { data, setData } = useContext(DataContext);
  const pageParams = {
    apiFunction: "getItems",
    limit: 12,
    userPage: false,
    setData,
    isItem: true,
  };
  const { page, setPage } = useDataFetching(pageParams);
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-light text-dark d-flex flex-column min-vh-100"
      : "bg-dark text-white d-flex flex-column min-vh-100";

  return (
    <div className={themeClass}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      <div className="flex-grow-1">
        <ErrorBoundary componentName="CustomNavBar">
          <h1 className="text-center m-3">All items</h1>
          <ItemList data={data.items.list} />
        </ErrorBoundary>
      </div>
      <CustomPagination
        page={page}
        limit={pageParams.limit}
        total={data.items.total}
        onSetPage={setPage}
      />
      <Footer className="mt-auto" />
    </div>
  );
};

export default ItemsPage;
