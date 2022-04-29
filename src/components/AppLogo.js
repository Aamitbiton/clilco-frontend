import React from "react";

function AppLogo(props) {
  const logo = require("../assets/clilco_logo.png");
  const style = {
    width: "150px",
    textAlign: "center",
  };
  return (
    <div className={"flex-center"}>
      <img style={style} src={logo} />
    </div>
  );
}

export default AppLogo;
