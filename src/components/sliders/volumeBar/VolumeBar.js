import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export const VolumeBar = ({ handle_questions_volume, initialValue }) => {
  const [value, setValue] = useState(initialValue || 100);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handle_questions_volume(newValue);
  };

  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  return (
    <Box sx={{ height: "85%" }}>
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
        }}
        value={value}
        onChange={handleChange}
        orientation="vertical"
        aria-label="Temperature"
        onKeyDown={preventHorizontalKeyboardNavigation}
      />
    </Box>
  );
};
