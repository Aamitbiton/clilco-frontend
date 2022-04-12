import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AppRoutes from "../app/AppRoutes";
function useRouterGuard(props) {
  const { LOGIN, REGISTRATION, ROOT, UPLOAD_IMAGE, VERIFY_PHONE } = AppRoutes;
  const user = useSelector((state) => state.user?.user);
  const appState = useSelector((state) => state.app);
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (!appState.app_ready) return;

    const dontVerifyPhone = () => user.private.id && !user.private.phone;
    const dontFillRegistrationForm = () => !user.public.gender;
    const dontUploadImage = () => !user.public.imgUrl;

    if (!user?.private?.id) navigate(LOGIN);
    else if (dontVerifyPhone()) navigate(VERIFY_PHONE);
    else if (dontFillRegistrationForm()) navigate(REGISTRATION);
    // else if (dontUploadImage()) navigate(UPLOAD_IMAGE);
    else navigate(ROOT);
  };
  useEffect(handleNavigation, [user]);
}

export default useRouterGuard;
