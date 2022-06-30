import React, { useEffect } from "react";
import "./afterVideo.scss";
import {
  answer_after_date,
  end_date,
  delete_room_from_state,
} from "../../store/video/videoFunctions";
import AppRoutes from "../../app/AppRoutes";
import Title from "../../components/title/title";
import { useSelector } from "react-redux";
import Text from "../../components/Text";
import AppButton from "../../components/Buttons/AppButton";
import AppStack from "../../components/AppStack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { create_snackBar, reset_snackBar } from "../../store/app/appFunctions";
import { SNACK_BAR_TYPES } from "../../store/app/snackBarTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { send_message_to_rn } from "../../store/reactNative/rnFunctions";

export const AfterVideo = () => {
  const translate = useSelector((s) => s.app.global_hooks.translate);
  const room = useSelector((s) => s.video.room);
  const navigate = useNavigate();
  const created = async () => {
    if (window.rn_app)
      send_message_to_rn({ type: "fired_app_review", payload: null });
    await end_date();
  };
  const handle_interested_btn = async () => {
    await answer_after_date({ positive: true });
    await notify_and_go_back_dating();
    if (window.rn_app)
      send_message_to_rn({ type: "fired_app_review", payload: null });
  };
  const handle_not_interested_btn = async () => {
    await answer_after_date({ negative: true });
    await notify_and_go_back_dating();
  };
  const notify_and_go_back_dating = async () => {
    await toast(SNACK_BAR_TYPES.ANSWER_ACCEPTED, { type: "success" });
    setTimeout(go_back_to_video_date_page, 2000);
  };
  const go_back_to_video_date_page = async () => {
    await delete_room_from_state();
    navigate(AppRoutes.LOBBY);
  };
  const handle_report_btn = async () => {
    navigate(AppRoutes.REPORT, { state: { report: { room } } });
  };

  useEffect(created, []);
  return (
    <>
      <div className="after-date-page" data_cy="after-date-page">
        <Title title={translate("after_date.title")} />
        <Text onClick={() => {}} sx={{ fontSize: "28px" }}>
          {translate("after_date.sub-title")}
        </Text>
        <AppStack direction="row" spacing={2} margin={2}>
          <AppButton
            labelColor="white"
            onClick={handle_interested_btn}
            label={translate("after_date.interested")}
            children={<CheckIcon style={{ marginRight: "10px" }} />}
          />
          <AppButton
            borderColor="#db1b87"
            labelColor="white"
            onClick={handle_not_interested_btn}
            label={translate("after_date.not_interested")}
            children={
              <CloseIcon style={{ marginRight: "10px", color: "#db1b87" }} />
            }
          />
        </AppStack>
        <p onClick={handle_report_btn} className="report">
          <span>{translate("after_date.report")}</span>
        </p>
      </div>
    </>
  );
};
