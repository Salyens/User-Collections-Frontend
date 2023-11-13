import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import CollectionWrapper from "../Wrappers/CollectionWrapper";
import CustomNavBar from "../AppNavbar/CustomNavBar";
import GenericList from "../GenericList";
import Footer from "../Footer/Footer";
import ItemWrapper from "../Wrappers/ItemWrapper";
import { useTranslation } from "react-i18next";
import ApiService from "../../services/ApiService";

const UserPage = ({ currentLang, onSetCurrentLang }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [userId, setUserId ] = useState("");
  const themeClass =
    theme === "light" ? "bg-light text-dark" : "bg-dark text-white";

    const handleGetUserId = async () => {
        try {
          const response = await ApiService.getUserInfo();
          setUserId(response.data._id)
        } catch (e) {
            console.log('e: ', e);
        }
      };

      useEffect(() => {
        handleGetUserId();
      }, []);

  return (
    <div className={themeClass}>
      <CustomNavBar
        currentLang={currentLang}
        onSetCurrentLang={onSetCurrentLang}
      />
      <GenericList
        getAll={true}
        type="collections"
        header={t("Home-collection-header")}
        limit="20"
        Wrapper={CollectionWrapper}
        apiFunction="getCollections"
        userId={userId}
        button="outline-success"
      />
      <Footer />
    </div>
  );
};

export default UserPage;
