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
import AppNavbar from "../AppNavbar";
import GenericList from "../GenericList";

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
              <WithAuth>
                <AppNavbar />
                <GenericList getAll={false} type="collection" />
                <GenericList getAll={false} type="item" />
              </WithAuth>
            }
          />
          <Route
            path="collections"
            element={
              <WithAuth>
                <AppNavbar />
                <GenericList getAll={true} type="collection" />
              </WithAuth>
            }
          />
          <Route
            path="items"
            element={
              <WithAuth>
                <AppNavbar />
                <GenericList getAll={true} type="item" />
              </WithAuth>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
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
