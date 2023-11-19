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
import { ThemeProvider } from "../../contexts/ThemeContext";
import MainPage from "../Pages/MainPage";
import CollectionsPage from "../Pages/CollectionsPage";
import ItemsPage from "../Pages/ItemsPage";
import UserPage from "../Pages/UserPage";
import SingleCollectionPage from "../Pages/SingleCollectionPage";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ErrorsProvider } from "../../contexts/ErrorsContext";
import { DataProvider } from "../../contexts/DataContext";

const App = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  if (localStorage.getItem("language"))
    setCurrentLang(localStorage.getItem("language"));

  return (
    <ThemeProvider>
      <ErrorsProvider>
        <DataProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route
                path="/main-page"
                element={
                  <MainPage
                    currentLang={currentLang}
                    onSetCurrentLang={setCurrentLang}
                  />
                }
              />
              <Route
                path="/collections"
                element={
                  <CollectionsPage
                    currentLang={currentLang}
                    onSetCurrentLang={setCurrentLang}
                  />
                }
              />
              <Route
                path="/items"
                element={
                  <ItemsPage
                    currentLang={currentLang}
                    onSetCurrentLang={setCurrentLang}
                  />
                }
              />
              <Route
                path="/user-collections"
                element={
                  <UserPage
                    currentLang={currentLang}
                    onSetCurrentLang={setCurrentLang}
                  />
                }
              />
              <Route
                path="/user-collections/:collectionName"
                element={
                  <SingleCollectionPage
                    currentLang={currentLang}
                    onSetCurrentLang={setCurrentLang}
                  />
                }
              />
              <Route path="/" element={<Navigate to="/main-page" replace />} />
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
        </DataProvider>
      </ErrorsProvider>
    </ThemeProvider>
  );
};

export default App;
