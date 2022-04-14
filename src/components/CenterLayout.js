import React from "react";

function CenterLayout({ children, direction = "row" }) {
  return (
    <div
      style={{
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
