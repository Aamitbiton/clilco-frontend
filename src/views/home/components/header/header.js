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
    top: 0,
  };
  const { header } = defaultStyles;
  const navigator = useNavigate();
  return (
    <div style={{ height: header.HEIGHT }} className={"header-container"}>
      <div
        style={{ cursor: "pointer" }}
        className="relative"
        onClick={() => navigator(AppRoutes.ROOT)}
      >
        <img className={"img"} alt="header" src={logo_header} />
        <div style={styles}>
          <Title
            mt={"40px"}
            fontSize={"18px"}
            color={"white"}
            title={"בהרצה"}
          />
        </div>
      </div>
      <Menu />
    </div>
  );
};
