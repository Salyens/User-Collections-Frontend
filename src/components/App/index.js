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
import CollectionList from "../Collections/CollectionList";
import ItemList from "../Items/ItemList/ItemList";

const App = () => {
  const [errors, setErrors] = useState([]);
  const [page, setPage] = useState(1);
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/users"
            element={
              <WithAuth>
                <AppNavbar />
                <CollectionList getAll={false} />
                <ItemList page={page} onSetPage={setPage} />
              </WithAuth>
            }
          />
          <Route
            path="/users/all"
            element={
              <WithAuth>
                <AppNavbar />
                <CollectionList getAll={true} />
                <ItemList page={page} onSetPage={setPage} />
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
