import React, { useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { Typography } from "@mui/material";
import AppStack from "../../../components/AppStack";
import defaultStyles from "../../../style/defaultStyles";

function ConfirmItem({ onOk, onReject, label, children }) {
  const ICON_SIZE = defaultStyles.icons.DEFAULT_LARGE_SIZE;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div className={"pointer"}>
      <ConfirmModal
        target={label}
        modalVisible={modalVisible}
        setModalVisible={(val) => setModalVisible(val)}
        onOk={() => {
          setModalVisible(false);
          onOk();
        }}
        onReject={() => {
          setModalVisible(false);
          onReject();
        }}
      />
      <div
        className={"flex-column-center"}
        style={{ fontSize: ICON_SIZE }}
        onClick={() => setModalVisible(true)}
      >
        {children} <Typography align={"center"}>{label}</Typography>
      </div>
    </div>
  );
}

export default ConfirmItem;
