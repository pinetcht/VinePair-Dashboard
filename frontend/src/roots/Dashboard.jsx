import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import React from "react";
import "../style/Dashboard.css";
import Graph from "../components/Graph";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { MobileNavigation } from "../components/MobileNavigation";


export const Dashboard = () => {
  const { displayedGraphName, weight, beverage, scoreType, handleJsonChange, graphAlerts } =
    useAuth();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  useEffect(() => {
    handleJsonChange(weight, beverage, scoreType);
  }, [weight, beverage, scoreType]);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <div className="chart-contents">
      <div className="dashboard-header">
        <div className="hamburger-header" onClick={toggleHamburger}>
          <MobileNavigation isOpen={hamburgerOpen} />
        </div>
        <div
          className="left-wrapper"
          style={{ alignItems: hamburgerOpen ? "start" : "center" }}
        >
          <h2>VinePair Audience Insights</h2>
        </div>

        <div className="right-wrapper">
          <DesktopNavigation />
        </div>
      </div>

      <div className={beverage === "wine" ? "chartBody Wine" : "chartBody"}>
        {displayedGraphName ? (
          <>
            <h3>{displayedGraphName}</h3>
            <h4>{" weight: " + weight}</h4>
            <Graph />
          </>
        ) : (
          <p>{ graphAlerts }</p>
        )}
      </div>
    </div>
  );
};
