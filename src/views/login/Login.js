import React from "react";
import {
  login_with_google,
  login_with_facebook,
} from "../../store/auth/authFunctions";
import "./login.css";
import AppButton from "../../components/AppButton";
import AppStack from "../../components/AppStack";
export const Login = () => {
  return (
    <div className={"login-container"}>
      <AppStack>
        <AppButton label={"google"} onClick={login_with_google} />
        <AppButton label={"facebook"} onClick={login_with_facebook} />
      </AppStack>
    </div>
  );
};
