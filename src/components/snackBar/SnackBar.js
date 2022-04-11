import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

export default function SimpleSnackbar() {
  const snackBarState = useSelector((state) => state.app.snackBar);

  const closIcon = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={snackBarState.handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={snackBarState.open}
      autoHideDuration={4000}
      onClose={snackBarState.handleClose}
      message={snackBarState.message}
      action={closIcon}
    />
  );
}
