import React from "react";
import {
  login_with_google,
  login_with_facebook,
} from "../../store/auth/authFunctions";
import "./login.css";
import AppButton from "../../components/AppButton";
import AppStack from "../../components/AppStack";
import Title from "../../components/title/title";
import googleIcon from "../../assets/Google-play-icon.png";
import facebookIcon from "../../assets/Facebook-icon.png";
import appleIcon from "../../assets/apple-icon.png";
import emailIcon from "../../assets/clilco_logo_naked.png";

export const Login = () => {
  return (
    <div className={"login-container"}>
      <Title title={"ברוכים הבאים"} />
      <AppStack direction={"column"}>
        <AppButton
          startIcon={googleIcon}
          labelColor={"white"}
          label={"התחבר עם גוגל"}
          onClick={login_with_google}
        />
        <AppButton
          startIcon={facebookIcon}
          labelColor={"white"}
          label={"התחבר עם פייסבוק"}
          onClick={login_with_facebook}
        />
        <AppButton
          startIcon={appleIcon}
          labelColor={"white"}
          label={"התחבר עם אפל"}
        />
        <AppButton
          startIcon={emailIcon}
          labelColor={"white"}
          label={"התחבר עם שם משתמש"}
        />
      </AppStack>
    </div>
  );
};
