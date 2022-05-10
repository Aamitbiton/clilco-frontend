import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export default function AppModal({
  modalVisible,
  setModalVisible,
  children,
  onCloseHandler = () => {},
  onClick,
  padding = 4,
  lockBackdrop = false,
  ...otherProps
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    // boxShadow: 24,
    p: padding,
  };
  const handleClose = (event, reason) => {
    if (lockBackdrop && reason === "backdropClick") return;
    setModalVisible(false);
    onCloseHandler();
  };
  return (
    <div>
      <Modal
        {...otherProps}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalVisible}
        onClose={handleClose}
        onClick={onClick}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalVisible}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
