import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
function AccordionItem({ icon, children }) {
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor: "#282828",
        }}
      >
        <AccordionSummary
          expandIcon={icon}
          sx={{
            direction: "rtl",
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{
              position: "absolute",
              top: "25%",
              right: "30%",
            }}
          >
            אפשרויות נוספות
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionItem;
