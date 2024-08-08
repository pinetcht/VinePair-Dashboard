import React, { createContext, useContext, useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { googleAuth } from "../roots/firebase"

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [displayedGraphName, setDisplayedGraphName] = useState("");
  const [graphAlerts, setGraphAlerts] = useState("No data selected");
  const [scoreType, setScoreType] = useState("");
  const [weight, setWeight] = useState("old");
  const [beverage, setBeverage] = useState("");
  const [selectedJson, setSelectedJson] = useState("");
  const [formResponse, setFormResponse] = useState("");



  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    try {
      await signOut(googleAuth)
      setFormResponse("Sign out successful")
      
    } catch {
      setFormResponse("Signout fail")
    }
  };

  const handleDisplayedGraphName = (selectedGraph) => {
    setDisplayedGraphName(selectedGraph);
  };

  const handleScoreType = (score) => {
    setScoreType(score);
  };

  const handleJsonChange = (weight, beverage, scoreType) => {

      beverage = beverage.toUpperCase();
      if (scoreType === "global") {
        scoreType = "scores";
      }

      const jsonPath =
        weight.toUpperCase() +
        "_" +
        beverage.toUpperCase() +
        "_" +
        scoreType +
        ".json";

      setSelectedJson(jsonPath);
    
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleBeverageChange = (bev) => {
    setBeverage(bev);
  };


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        displayedGraphName,
        handleDisplayedGraphName,
        scoreType,
        handleScoreType,
        weight,
        handleWeightChange,
        beverage,
        handleBeverageChange,
        selectedJson,
        handleJsonChange,
        formResponse,
        setFormResponse,
        graphAlerts,
        setGraphAlerts
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
