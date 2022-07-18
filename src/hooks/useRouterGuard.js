import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AppRoutes from "../app/AppRoutes";
import { send_message_to_rn } from "../store/reactNative/rnFunctions";
function useRouterGuard(props) {
  const { LOGIN, REGISTRATION, ROOT, UPLOAD_IMAGE, VERIFY_PHONE } = AppRoutes;
  const user = useSelector((state) => state.user?.user);
  const appState = useSelector((state) => state.app);
  const navigate = useNavigate();
  const location = useLocation();
  const AUTH_ROUTES = [LOGIN, REGISTRATION, UPLOAD_IMAGE, VERIFY_PHONE];
  const handleNavigation = () => {
    if (!appState.app_ready || !appState.finished_fetching_user) return;
    console.log("PATH NAME: ", location.pathname);
    const didntVerifyPhone = () => user.private.id && !user.private.phone;
    const didntFillRegistrationForm = () => !user.public.gender;
    const didntUploadImage = () => !user.public.imgUrl;
    const isAuthRoute = () => AUTH_ROUTES.includes(location.pathname);
    if (!user?.private?.id) navigate(LOGIN);
    else if (didntVerifyPhone()) navigate(VERIFY_PHONE);
    else if (didntFillRegistrationForm()) navigate(REGISTRATION);
    else if (didntUploadImage()) navigate(UPLOAD_IMAGE);
    else if (isAuthRoute()) navigate(ROOT);
    else return navigate(UPLOAD_IMAGE);
  };
  const sendLocationToMobile = () => {
    if (window.rn_app) {
      send_message_to_rn({
        type: "updateCurrentPath",
        payload: location.pathname,
      });
    }
  };

  useEffect(sendLocationToMobile, [location.pathname]);
  useEffect(handleNavigation, [user, appState.app_ready]);
}

export default useRouterGuard;
