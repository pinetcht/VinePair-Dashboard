import React from "react";
import { DropDownButton, DropDownWeights } from "./DropDowns";
import { Logout } from "./LogoutButton";

export const MobileNavigation = ({ isOpen }) => {

  return (
    <div>
      <i style={{ fontSize: "32px" }} className="material-icons">
        menu
      </i>
      {isOpen && (
        <div>
          <DropDownButton menu="wine" />
          <DropDownButton menu="beer" />
          <DropDownButton menu="spirit" />
          <DropDownWeights />
          <Logout />
        </div>
      )}

    </div>
  );
};
