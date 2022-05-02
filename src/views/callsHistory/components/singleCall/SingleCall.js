import React, { useEffect, useState } from "react";
import "./singleCall.scss";
import { useSelector } from "react-redux";
import { get_user_public_data } from "../../../../store/user/userFunctions";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import CloseIcon from "@mui/icons-material/Close";
import SimpleTooltip from "../../../../components/tooltips/simpleTooltip/SimpleTooltip";

export const SingleCall = ({ call }) => {
  const isMobile = useSelector((state) => state.app.isMobile);
  const translate = useSelector((s) => s.app.global_hooks.translate);
  const [otherUserData, setOtherUserData] = useState(null);
  const [showImgFullScreen, setShowImgFullScreen] = useState(false);
  const [userTypeInCall, setUserTypeInCall] = useState(null);
  const [otherUserTypeInCall, setOtherUserTypeInCall] = useState(null);
  const user = useSelector((state) => state.user.user);
  const created = async () => {
    await determine_user_type();
  };
  const init_data_fetch = async () => {
    if (userTypeInCall) {
      await get_other_user_data();
      setOtherUserTypeInCall(
        userTypeInCall === "caller" ? "answerer" : "caller"
      );
    }
  };
  const determine_user_type = () => {
    setUserTypeInCall(
      call.caller.id === user.private.id ? "caller" : "answerer"
    );
  };
  const get_other_user_data = async () => {
    const otherUserId =
      call.caller.id === user.private.id ? call.answerer.id : call.caller.id;
    setOtherUserData(await get_user_public_data(otherUserId));
  };
  const get_other_user_age = (milli) => {
    return new Date().getFullYear() - new Date(milli).getFullYear();
  };
  const get_date_date = () => new Date(call.startTime).toLocaleDateString();
  useEffect(created, []);
  useEffect(init_data_fetch, [userTypeInCall]);
  return (
    <>
      {otherUserData && (
        <div className={"single-call " + (!isMobile ? "desktop-call" : "")}>
          <div className="image-area">
            <div
              className="image-border"
              onClick={() => setShowImgFullScreen(true)}
            >
              <div
                className="user-image"
                style={{
                  backgroundImage: `url(${otherUserData?.imgUrl?.url})`,
                }}
              />
            </div>
          </div>

          <div className="information">
            <b>
              {otherUserData.name}, {get_other_user_age(otherUserData.birthday)}
            </b>
            <b>{otherUserData.city.name}</b>
            <b>{get_date_date()}</b>
          </div>

          <div className="phone-area">
            <b>
              <a
                className="phone-number"
                href={"tel:" + call[otherUserTypeInCall]?.phone}
              >
                {call[otherUserTypeInCall]?.phone}
              </a>
            </b>
          </div>

          {showImgFullScreen && (
            <img
              onClick={() => setShowImgFullScreen(false)}
              className={
                isMobile
                  ? "full-screen-image-mobile"
                  : "full-screen-image-desktop"
              }
              src={otherUserData?.imgUrl?.url}
            />
          )}
        </div>
      )}
    </>
  );
};
