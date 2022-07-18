import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Home } from "../../views/home/Home";
import { ViewUsers } from "../../views/viewUsers/ViewUsers";
import { Profile } from "../../views/profile/Profile";
import { AddImage } from "../../views/addImage/AddImage";
import { AfterVideo } from "../../views/afterVideo/AfterVideo";
import { RegistrationForm } from "../../views/registrationForm/RegistrationForm";
import { VerifyPhone } from "../../views/verifyPhone/VerifyPhone";
import { VideoDate } from "../../views/videoDate/VideoDate";
import { NewVideoDate } from "../../views/videoDate/NewVideoDate";
import { VideoDate_v3 } from "../../views/videoDate/VideoDate_v3";
import { Lobby } from "../../views/lobby/Lobby";
import { Missed } from "../../views/missed/Missed";
import { CallsHistory } from "../../views/callsHistory/CallsHistory";
import React, { useEffect } from "react";
import AppRoutes from "../AppRoutes";
import { useSelector } from "react-redux";
import Contact from "../../views/Contact/Contact";
import Settings from "../../views/Settings/Settings";
import Privacy from "../../views/privacy/Privacy";
import useUserTracking from "../../hooks/useUserTracking";
import ReportUser from "../../views/ReportUser/ReportUser";

export const AuthenticatedLayout = () => {
  const location = useLocation();
  useUserTracking();
  const user = useSelector((state) => state.user.user);
  const appState = useSelector((state) => state.app);
  const {
    AFTER_VIDEO,
    PROFILE,
    REGISTRATION,
    ROOT,
    UPLOAD_IMAGE,
    VERIFY_PHONE,
    VIDEO_DATE,
    VIEW_USERS,
    CONTACT,
    SETTINGS,
    CALLS,
    LOBBY,
    PRIVACY,
    REPORT,
    NEW_VIDEO_DATE,
  } = AppRoutes;
  return (
    <>
      {appState.finished_fetching_user && user.private?.id && (
        <Routes>
          <Route path={ROOT} element={<Home />} />
          <Route path={UPLOAD_IMAGE} element={<AddImage />} />
          <Route path={REGISTRATION} element={<RegistrationForm />} />
          <Route path={VIEW_USERS} element={<ViewUsers />} />
          <Route path={PROFILE} element={<Profile />} />
          <Route path={AFTER_VIDEO} element={<AfterVideo />} />
          <Route path={VERIFY_PHONE} element={<VerifyPhone />} />
          <Route path={VIDEO_DATE} element={<VideoDate_v3 />} />
          <Route path={CONTACT} element={<Contact />} />
          <Route path={SETTINGS} element={<Settings />} />
          <Route path={CALLS} element={<CallsHistory />} />
          <Route path={LOBBY} element={<Lobby />} />
          <Route path="*" element={<Missed />} />
        </Routes>
      )}
    </>
  );
};
