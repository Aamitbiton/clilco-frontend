import React from "react";
import { Box, Button, Paper } from "@mui/material";

function Image({
  src,
  alt,
  height = "200px",
  width = "200px",
  removeImage = false,
}) {
  return (
    <Paper style={{ height, width }} variant="outlined">
      {removeImage && (
        <Button
          style={{ position: "absolute" }}
          startIcon={"x"}
          variant={"outlined"}
          onClick={() => removeImage(src)}
        />
      )}
      <img style={{ width: "100%" }} src={src} alt={alt} />
    </Paper>
  );
}

export default Image;
