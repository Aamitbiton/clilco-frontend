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
    return user.testUser;
  };
  return (
    <CenterLayout direction={"column"}>
      <Title textAlign={"center"} title={"חווית ספיד דייט חכם"} />
      <Title
        mt={0}
        mb={0}
        fontSize={"20px"}
        color={"white"}
        textAlign={"center"}
        title={"כל יום בין 19:00 ל 21:00"}
      />
      {start_date_visible() || videoState.speed_date_time.its_dating_time ? (
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
