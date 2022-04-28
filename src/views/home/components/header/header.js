import React from "react";
import "./header.css";
import logo_header from "../../../../assets/logo_header.png";
import Menu from "../Menu/Menu";
import defaultStyles from "../../../../style/defaultStyles";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../../../../app/AppRoutes";

export const Header = () => {
  const { header } = defaultStyles;
  const navigator = useNavigate();
  return (
    <div style={{ height: header.HEIGHT }} className={"header-container"}>
      <img
        style={{ cursor: "pointer" }}
        onClick={() => navigator(AppRoutes.ROOT)}
        className={"img"}
        alt="header"
        src={logo_header}
      />
      <Menu />
    </div>
  );
};
