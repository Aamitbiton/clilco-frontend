import React, { useEffect } from "react";
import "./afterVideo.scss";
import {
  answer_after_date,
  end_date,
  delete_room_from_state,
  clean_room,
} from "../../store/video/videoFunctions";
import AppRoutes from "../../app/AppRoutes";
import Title from "../../components/title/title";
import { useSelector } from "react-redux";
import Text from "../../components/Text";
import AppButton from "../../components/Buttons/AppButton";
import AppStack from "../../components/AppStack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import { create_snackBar, reset_snackBar } from "../../store/app/appFunctions";
import { SNACK_BAR_TYPES } from "../../store/app/snackBarTypes";
import { useNavigate } from "react-router-dom";

export const AfterVideo = () => {
  const translate = useSelector((s) => s.app.global_hooks.translate);
  const navigate = useNavigate();
  const created = async () => {
    await end_date();
  };
  const handle_interested_btn = async () => {
    await answer_after_date({ positive: true });
    await notify_and_go_back_dating();
  };
  const handle_not_interested_btn = async () => {
    await answer_after_date({ negative: true });
    await notify_and_go_back_dating();
  };
  const notify_and_go_back_dating = async () => {
    clean_room();
    let done = false;
    await create_snackBar({
      message: SNACK_BAR_TYPES.ANSWER_ACCEPTED,
      action: async () => {
        done = true;
        await reset_snackBar;
        await go_back_to_video_date_page();
      },
    });
    setTimeout(() => {
      if (!done) {
        reset_snackBar();
        go_back_to_video_date_page();
      }
    }, 2000);
  };
  const go_back_to_video_date_page = async () => {
    await delete_room_from_state();
    navigate(AppRoutes.VIDEO_DATE);
  };
  const handle_report_btn = async () => {};

  useEffect(created, []);
  return (
    <>
      <div className="after-date-page">
        <Title title={translate("after_date.title")} />
        <Text onClick={() => {}} sx={{ fontSize: "28px" }}>
          {translate("after_date.sub-title")}
        </Text>
        <AppStack direction="column" spacing={2} margin={2}>
          <AppButton
            labelColor="white"
            borderColor=""
            onClick={handle_interested_btn}
            label={translate("after_date.interested")}
            width="250px"
            children={<CheckIcon style={{ marginRight: "10px" }} />}
          />
          <AppButton
            labelColor="white"
            borderColor="purple"
            onClick={handle_not_interested_btn}
            width="250px"
            label={translate("after_date.not-interested")}
            children={
              <CloseIcon style={{ marginRight: "10px", color: "purple" }} />
            }
          />
          <AppButton
            labelColor="white"
            borderColor="white"
            onClick={handle_report_btn}
            width="250px"
            label={translate("after_date.report")}
            children={
              <EmojiFlagsIcon style={{ marginRight: "10px", color: "white" }} />
            }
          />
        </AppStack>
      </div>
    </>
  );
};
