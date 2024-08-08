import { useState } from "react";
import { useAuth } from "./AuthContext";
import React from "react";
import "../style/DropDownButton.css";

export const DropDownChoice = ({ menu, scoreType }) => {
  const { handleDisplayedGraphName, handleScoreType, handleBeverageChange } =
    useAuth();
  return (
    <button
      onClick={() => {
        handleScoreType(scoreType || "");
        handleDisplayedGraphName(`${menu} ${scoreType || ""}`);
        handleBeverageChange(menu);
      }}
      className="dropDownChoice"
    >
      {menu + " " + (scoreType || "")}
    </button>
  );
};

export const DropDownButton = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="dropbtn" onClick={ toggleDropdown }>
        {menu}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <DropDownChoice menu={menu} scoreType={"subscores"} />
          <DropDownChoice menu={menu} scoreType={"global"} />
        </div>
      )}
    </div>
  );
};


export const DropDownWeights = () => {
  const { weight, handleWeightChange } = useAuth("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="dropbtn" onClick={ toggleDropdown }>weights</button>
  {isOpen && (

      <div className="dropdown-content">
        <div className="radio">
          {/* default  weight is old */}
          <input
            className="radioTick"
            type="radio"
            id="old"
            name="weight"
            value="old"
            checked={weight === "old"}
            onChange={handleWeightChange}
          />
          <label htmlFor="old">Old</label>
        </div>

        <div className="radio">
          <input
            className="radioTick"
            type="radio"
            id="equal"
            name="weight"
            value="equal"
            checked={weight === "equal"}
            onChange={handleWeightChange}
          />
          <label htmlFor="equal">Equal</label>
        </div>

        <div className="radio">
          <input
            className="radioTick"
            type="radio"
            id="new"
            name="weight"
            value="new"
            checked={weight === "new"}
            onChange={handleWeightChange}
          />
          <label htmlFor="new">New</label>
        </div>
      </div>
      )}
    </div>
  );
};
