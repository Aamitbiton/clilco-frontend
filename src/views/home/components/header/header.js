import React from "react";
import "./header.css";
import logo_header from "../../../../assets/logo_header.png";
import Menu from "../Menu/Menu";
import defaultStyles from "../../../../style/defaultStyles";

export const Header = () => {
  const { header } = defaultStyles;
  return (
    <div style={{ height: header.HEIGHT }} className={"header-container"}>
      <img className={"img"} alt="header" src={logo_header} />
      <Menu />
    </div>
  );
};
