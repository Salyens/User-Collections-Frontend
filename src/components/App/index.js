import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WithAuth from "../HOC/WithAuth";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import ErrorBoundary from "../HOC/ErrorBoundary";
import { useTranslation } from "react-i18next";
import { ThemeContext, ThemeProvider } from "../../contexts/ThemeContext";
import MainPage from "../Pages/MainPage";
import CollectionsPage from "../Pages/CollectionsPage";
import ItemsPage from "../Pages/ItemsPage";
import UserPage from "../Pages/UserPage";
import SingleCollectionPage from "../Pages/SingleCollectionPage";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ErrorsProvider } from "../../contexts/ErrorsContext";
import SingleItemPage from "../Pages/SingleItemPage";
import { DataContext } from "../../contexts/DataContext";
import { LangContext } from "../../contexts/LangContext";

const App = () => {
  const [collections, setCollections] = useState({
    data: [],
    total: 0,
    isLoading: true,
  });
  const [items, setItems] = useState({
    data: [],
    total: 0,
    isLoading: true,
  });
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "bg-light text-dark"
  );
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  if (localStorage.getItem("language"))
    setCurrentLang(localStorage.getItem("language"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ErrorsProvider>
        <DataContext.Provider
          value={{ collections, setCollections, items, setItems }}
        >
          <LangContext.Provider value={{ currentLang, setCurrentLang }}>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/main-page" element={<MainPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/items" element={<ItemsPage />} />
                <Route path="/items/:itemName" element={<SingleItemPage />} />
                <Route
                  path="/user-collections"
                  element={
                    <WithAuth>
                      <UserPage userPage={true} />
                    </WithAuth>
                  }
                />
                <Route
                  path="/user-collections/:collectionName"
                  element={
                    <WithAuth>
                      <SingleCollectionPage
                        currentLang={currentLang}
                        onSetCurrentLang={setCurrentLang}
                        userPage={true}
                      />
                    </WithAuth>
                  }
                />
                <Route
                  path="collections/:collectionName"
                  element={<SingleCollectionPage userPage={false} />}
                />
                <Route
                  path="/"
                  element={<Navigate to="/main-page" replace />}
                />
                <Route
                  path="/*"
                  element={
                    <h1 className="text-center text-danger">
                      404 Error! Page is not found
                    </h1>
                  }
                />
              </Routes>
            </Router>
          </LangContext.Provider>
        </DataContext.Provider>
      </ErrorsProvider>
    </ThemeContext.Provider>
  );
};

export default App;
