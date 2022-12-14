import React, { useState } from "react";
import Title from "../../../components/title/title";
import { StartDate } from "./startDate/StartDate";
import { NotDateTime } from "./notDateTime/NotDateTime";
import { useSelector } from "react-redux";
import CenterLayout from "../../../components/CenterLayout";
import ZoomAnimation from "../../../components/animations/Zoom/ZoomAnimation";
import GrowAnimation from "../../../components/animations/Grow/GrowAnimation";
import AppButton from "../../../components/Buttons/AppButton";

function MainView(props) {
  const videoState = useSelector((state) => state.video);
  const navigate = useSelector((state) => state.app.global_hooks.navigator);
  const user = useSelector((state) => state.user.user.public);
  const start_date_visible = () => {
    return user.testUser || videoState.speed_date_time.its_dating_time;
  };
  return (
    <CenterLayout direction={"column"}>
      <GrowAnimation visible={true}>
        <Title textAlign={"center"} title={"חווית ספיד דייט חכם"} />
        <Title
          mt={0}
          mb={0}
          fontSize={"20px"}
          color={"white"}
          textAlign={"center"}
          title={"כל יום בין 21:00 ל 22:00"}
        />
      </GrowAnimation>
      <ZoomAnimation visible={true}>
        {start_date_visible() ? (
          <StartDate navigate={navigate} />
        ) : (
          <NotDateTime
            navigate={navigate}
            datesStartedMilliseconds={videoState.speed_date_time.start}
          />
        )}
      </ZoomAnimation>
    </CenterLayout>
  );
}

export default MainView;
