import React from "react";
import AppModal from "../AppModal";
import Title from "../title/title";
import AppButton from "../Buttons/AppButton";

function ConfirmModal({
  modalVisible,
  setModalVisible,
  target,
  acceptLabel = "כן",
  rejectLabel = "לא",
  onOk = () => {},
  onReject = () => {},
}) {
  const confirmMessage = "האם אתה בטוח שברצונך לבצע " + target + "?";
  return (
    <AppModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <Title title={confirmMessage} mb={10} />
      <div className={"flex-row_around"}>
        <AppButton label={acceptLabel} onClick={onOk} />
        <AppButton label={rejectLabel} onClick={onReject} />
      </div>
    </AppModal>
  );
}

export default ConfirmModal;
