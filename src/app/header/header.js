import React from "react";
import "./header.css";
import logo_header from "../../assets/logo_header.png";

export const Header = () => {
  return (
    <div className={"header-container"}>
      <img className={"img"} alt="header" src={logo_header} />
    </div>
  );
};
