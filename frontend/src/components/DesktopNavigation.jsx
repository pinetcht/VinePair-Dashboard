import React from "react";
import { DropDownButton, DropDownWeights  } from "./DropDowns";
import { Logout } from "./LogoutButton";

export const DesktopNavigation = () => {
  return (
    <div>
      <Logout />
      <DropDownButton menu="wine" />
      <DropDownButton menu="beer" />
      <DropDownButton menu="spirit" />
      <DropDownWeights />
    </div>
  );
};
