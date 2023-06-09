import React, { createContext, useContext, useState } from "react";
import { Alert, Divider } from "antd";
const AlertContext = createContext();
const useAlert = () => useContext(AlertContext);

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, description, type = "info") => {
    setAlert({ message, description, type });
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };
  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {alert && (
        <>
          <Alert
            message={alert.message}
            description={alert.description}
            type={alert.type}
            showIcon
          />
          <Divider />
        </>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider, useAlert };
