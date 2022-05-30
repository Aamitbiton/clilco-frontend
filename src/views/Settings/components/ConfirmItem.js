import React, { useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { Typography } from "@mui/material";
import AppStack from "../../../components/AppStack";
import defaultStyles from "../../../style/defaultStyles";
import Settings_Item from "./Settings_Item";

function ConfirmItem({ onOk, onReject, label, children, icon }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
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
      <Settings_Item
        onClick={() => setModalVisible(true)}
        icon={icon}
        label={label}
      />
    </>
  );
}

export default ConfirmItem;
