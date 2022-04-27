import React, { useEffect, useState } from "react";
import "./singleCall.scss";
import { useSelector } from "react-redux";
import { get_user_public_data } from "../../../../store/user/userFunctions";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export const SingleCall = ({ call }) => {
  const isMobile = useSelector((state) => state.app.isMobile);
  const translate = useSelector((s) => s.app.global_hooks.translate);
  const [otherUserData, setOtherUserData] = useState(null);
  const [userTypeInCall, setUserTypeInCall] = useState(null);
  const [otherUserTypeInCall, setOtherUserTypeInCall] = useState(null);
  const myUser = useSelector((state) => state.user.user);
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
      call.caller.id === myUser.private.id ? "caller" : "answerer"
    );
  };
  const get_other_user_data = async () => {
    const otherUserId =
      call.caller.id === myUser.private.id ? call.answerer.id : call.caller.id;
    setOtherUserData(await get_user_public_data(otherUserId));
  };
  const get_date_date = () => {
    return new Date(call.startTime).toLocaleDateString();
  };

  const get_date_time = () => {
    const d = new Date(call.startTime);
    const hours = d.getHours() > 9 ? d.getHours() : "0" + d.getHours();
    const minutes = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
    return hours + ":" + minutes;
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
            <div
              className="user-image"
              style={{ backgroundImage: `url(${otherUserData?.imgUrl?.url})` }}
            />
            {call[otherUserTypeInCall]?.positive ? (
              <CheckIcon color={"primary"} />
            ) : (
              <CloseIcon color={"secondary"} />
            )}
          </div>

          <div className="information">
            <b className="name">{otherUserData.name}</b>
            <b>{get_date_date()}</b>
            <b>{get_date_time()}</b>
            <b>
              <a
                className="phone-number"
                href={"tel:" + call[otherUserTypeInCall]?.phone}
              >
                {call[otherUserTypeInCall]?.phone}
              </a>
            </b>
          </div>

          <div className="image-area">
            <div
              className="user-image"
              style={{ backgroundImage: `url(${myUser.public?.imgUrl?.url})` }}
            />
            {call[userTypeInCall]?.positive ? (
              <CheckIcon color={"primary"} />
            ) : (
              <CloseIcon color={"secondary"} />
            )}
          </div>
        </div>
      )}
    </>
  );
};
