import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AppToastContainer({ closeOnClick = true, draggable = true }) {
  return <ToastContainer closeOnClick={closeOnClick} draggable={draggable} />;
}

export default AppToastContainer;
