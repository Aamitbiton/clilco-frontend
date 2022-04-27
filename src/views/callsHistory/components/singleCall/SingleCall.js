import React, { useEffect, useState } from "react";
import "./singleCall.scss";
import { useSelector } from "react-redux";
import { get_user_public_data } from "../../../../store/user/userFunctions";

export const SingleCall = ({ call }) => {
  const isMobile = useSelector((state) => state.app.isMobile);
  const translate = useSelector((s) => s.app.global_hooks.translate);
  const [otherUserData, setOtherUserData] = useState(null);
  const [userTypeInCall, setUserTypeInCall] = useState(null);
  const [otherUserTypeInCall, setOtherUserTypeInCall] = useState(null);
  const myId = useSelector((state) => state.user.user.private.id);
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
    setUserTypeInCall(call.caller.id === myId ? "caller" : "answerer");
  };
  const get_other_user_data = async () => {
    const otherUserId =
      call.caller.id === myId ? call.answerer.id : call.caller.id;
    setOtherUserData(await get_user_public_data(otherUserId));
  };
  const get_date_time = () => {
    const d = new Date(call.startTime);
    const day = d.toLocaleDateString();
    const hours = d.getHours() > 9 ? d.getHours() : "0" + d.getHours();
    const minutes = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
    const time = hours + ":" + minutes;
    return day + " " + time;
  };
  useEffect(created, []);
  useEffect(init_data_fetch, [userTypeInCall]);
  return (
    <>
      {otherUserData && (
        <div
          className={
            "single-call " +
            (!isMobile && "desktop-call") +
            (call[otherUserTypeInCall]?.phone ? " success" : " fail")
          }
        >
          <div className="image-area">
            <img
              className="user-image"
              src={otherUserData?.imgUrl?.url}
              alt={"user-image"}
            />
          </div>

          <div className="information">
            <b className="name">{otherUserData.name}</b>
            <div>{get_date_time()}</div>
          </div>

          <div className="phone-area">
            <b>
              {call[userTypeInCall]?.negative && translate("calls.you_refused")}

              {call[otherUserTypeInCall]?.negative &&
                translate("calls.you_were_rejected")}
              <a
                className="phone-number"
                href={"tel:" + call[otherUserTypeInCall]?.phone}
              >
                {call[otherUserTypeInCall]?.phone}
              </a>
            </b>
          </div>
        </div>
      )}
    </>
  );
};
