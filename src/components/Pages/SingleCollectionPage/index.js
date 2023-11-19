import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import Footer from "../../Footer/Footer";
import SingleCollection from "../../Collection/SingleCollection/index.js";
import ItemsTable from "../../Item/ItemsTable/index.js";

const SingleCollectionPage = ({ currentLang, onSetCurrentLang }) => {
  const { t, i18n } = useTranslation();
  const [collection, setCollection] = useState({});
  const [items, setItems] = useState([]);
  const { theme } = useContext(ThemeContext);
  const themeClass =
    theme === "light"
      ? "bg-light text-dark d-flex flex-column min-vh-100"
      : "bg-dark text-white d-flex flex-column min-vh-100";

  return (
    <div className={themeClass}>
      <CustomNavBar
        currentLang={currentLang}
        onSetCurrentLang={onSetCurrentLang}
      />
      <div className="flex-grow-1">
        <SingleCollection onSetItems={setItems} collection={collection} onSetCollection={setCollection}  />
        <ItemsTable collection={collection} items={items} />
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default SingleCollectionPage;
