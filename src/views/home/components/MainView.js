import React from "react";
import Title from "../../../components/title/title";
import { StartDate } from "./startDate/StartDate";
import { NotDateTime } from "./notDateTime/NotDateTime";
import { useSelector } from "react-redux";
import CenterLayout from "../../../components/CenterLayout";

function MainView(props) {
  const videoState = useSelector((state) => state.video);
  const navigate = useSelector((state) => state.app.global_hooks.navigator);
  const user = useSelector((state) => state.user.user.public);
  const start_date_visible = () => {
    return user.testUser | user.pilot_user;
  };
  return (
    <CenterLayout direction={"column"}>
      <Title textAlign={"center"} title={"חווית ספיד דייט חכם"} />
      {start_date_visible() ? (
        <StartDate navigate={navigate} />
      ) : (
        <NotDateTime
          navigate={navigate}
          datesStartedMilliseconds={videoState.speed_date_time.start}
        />
      )}
    </CenterLayout>
  );
}

export default MainView;
