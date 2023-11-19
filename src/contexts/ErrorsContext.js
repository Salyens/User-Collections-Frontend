import React, { createContext, useState, } from "react";

export const ErrorsContext = createContext();

export const ErrorsProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  return (
    <ErrorsContext.Provider value={{ errors, setErrors }}>
      {children}
    </ErrorsContext.Provider>
  );
};
