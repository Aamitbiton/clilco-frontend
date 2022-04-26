import React from "react";
import { Box, Button, Paper, useTheme } from "@mui/material";

function Image({
  src,
  alt,
  height = "200px",
  width = "200px",
  removeImage = false,
  onClick,
}) {
  const theme = useTheme();
  return (
    <Paper
      style={{ height, width, background: "transparent", border: "none" }}
      variant="outlined"
      onClick={onClick}
    >
      {removeImage && (
        <Button
          sx={{
            position: "absolute",
            borderRadius: 100,
            padding: 0,
          }}
          variant={"text"}
          onClick={() => removeImage(src)}
        >
          x
        </Button>
      )}
      {src && (
        <img
          style={{ width: "inherit", height: "inherit", objectFit: "contain" }}
          src={src}
          alt={alt}
        />
      )}
    </Paper>
  );
}

export default Image;
