import React from "react";
import Title from "../../../components/title/title";
import { StartDate } from "./startDate/StartDate";
import { NotDateTime } from "./notDateTime/NotDateTime";
import { useSelector } from "react-redux";

function MainView(props) {
  const videoState = useSelector((state) => state.video);
  const navigate = useSelector((state) => state.app.global_hooks.navigator);
  return (
    <>
      <Title title={"חווית ספיד דייט חכם"} />
      {videoState.speed_date_time.its_dating_time ? (
        <StartDate navigate={navigate} />
      ) : (
        <NotDateTime
          navigate={navigate}
          datesStartedMilliseconds={videoState.speed_date_time.start}
        />
      )}
    </>
  );
}

export default MainView;