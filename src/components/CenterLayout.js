import React from "react";
import defaultStyles from "../style/defaultStyles";

function CenterLayout({ children, direction = "row" }) {
  return (
    <div
      style={{
        // paddingTop: defaultStyles.header.HEIGHT,
        display: "flex",
        flexDirection: direction,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {children}
    </div>
  );
}

export default CenterLayout;
