import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./startDate.css";

export const StartDate = ({ handle_start_date_click }) => {
  return (
    <>
      <div className="start-date">
        <div
          onClick={handle_start_date_click}
          className="start-btn"
          variant="contained"
          color="red"
        >
          Start Dating!
        </div>
      </div>
    </>
  );
};
