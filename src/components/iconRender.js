import React from "react";

function IconRender({ icon }) {
  const style = {
    width: 30,
    height: "100%",
    left: 10,
    top: 0,
    display: "flex",
    position: "absolute",
    alignItems: "center",
    justifyContent: "start",
  };
  return (
    <div style={style}>
      <img style={{ width: "100%" }} alt={"app-icon"} src={icon} />
    </div>
  );
}

export default IconRender;
