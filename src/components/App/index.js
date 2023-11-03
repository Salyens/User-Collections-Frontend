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
import GenericList from "../GenericList";
import Footer from "../Footer/Footer";
import CustomNavBar from "../AppNavbar/CustomNavBar";
import CollectionWrapper from "../Wrappers/CollectionWrapper";
import ItemWrapper from "../Wrappers/ItemWrapper";

const App = () => {
  const [errors, setErrors] = useState([]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/main-page"
            element={
              <>
                <CustomNavBar />
                <GenericList
                  getAll={false}
                  type="collections"
                  header="Largest Collections"
                  limit="5"
                  Wrapper={CollectionWrapper}
                  apiFunction="getCollections"
                  button="outline-success"
                />
                <GenericList
                  getAll={false}
                  type="items"
                  header="New Items"
                  limit="12"
                  Wrapper={ItemWrapper}
                  apiFunction="getItems"
                  button="outline-primary"
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/collections"
            element={
              <>
                <CustomNavBar />
                <GenericList
                  getAll={true}
                  type="collections"
                  header="All Collections"
                  limit="6"
                  Wrapper={CollectionWrapper}
                  apiFunction="getCollections"
                  button="outline-success"
                />
              </>
            }
          />
          <Route
            path="/items"
            element={
              <>
                <CustomNavBar />
                <GenericList
                  getAll={true}
                  type="items"
                  header="All Items"
                  limit="12"
                  Wrapper={ItemWrapper}
                  apiFunction="getItems"
                  button="outline-primary"
                />
              </>
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
      </div>
    </Router>
  );
};

export default App;
