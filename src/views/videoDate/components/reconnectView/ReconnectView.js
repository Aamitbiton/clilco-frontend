import React from "react";
import "./reconnectCss.scss";
export const ReconnectView = () => {
  let img = require("../../../../assets/disconnected-icon.png");
  return (
    <div className={"reconnect-container flex-center column"}>
      <img src={img} />
      <b className={"reconnect-text"}>זוהה חיבור אינטרנט איטי, אנא המתן...</b>
    </div>
  );
};
