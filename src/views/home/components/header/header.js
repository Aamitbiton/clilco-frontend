import React from "react";
import "./header.css";
import logo_header from "../../../../assets/logo_header.png";
import Menu from "../Menu/Menu";
import defaultStyles from "../../../../style/defaultStyles";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../../../../app/AppRoutes";
import Title from "../../../../components/title/title";

export const Header = () => {
  const styles = {
    position: "absolute",
    right: "5px",
    lineHeight: "0px",
    margin: "0px",
  };
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
      <div style={styles}>
        <Title fontSize={"18px"} color={"white"} title={"בהרצה"} />
      </div>
      <Menu />
    </div>
  );
};
