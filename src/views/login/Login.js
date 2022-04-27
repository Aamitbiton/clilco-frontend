import React, { useState } from "react";
import {
  login_with_google,
  login_with_facebook,
} from "../../store/auth/authFunctions";
import "./login.css";
import AppButton from "../../components/Buttons/AppButton";
import AppStack from "../../components/AppStack";
import Title from "../../components/title/title";
import googleIcon from "../../assets/Google-play-icon.png";
import facebookIcon from "../../assets/Facebook-icon.png";
import appleIcon from "../../assets/apple-icon.png";
import emailIcon from "../../assets/clilco_logo_naked.png";
import LoginWithEmail from "./components/loginWithEmail";
import { useSelector } from "react-redux";
import CenterLayout from "../../components/CenterLayout";
import defaultStyles from "../../style/defaultStyles";

export const Login = () => {
  const translate = useSelector((s) => s.app.global_hooks.translate);
  const [enter_with_web, set_enter_with_web] = useState(false);
  const { inputs } = defaultStyles;
  return (
    <CenterLayout direction={"column"}>
      <div>
        {enter_with_web ? (
          <LoginWithEmail close={() => set_enter_with_web(false)} />
        ) : (
          <>
            <Title textAlign={"center"} title={translate("Welcome_title")} />
            <AppStack direction={"column"}>
              <AppButton
                rounded={false}
                width={inputs.STATIC_WIDTH}
                height={inputs.STATIC_HEIGHT}
                endIcon={googleIcon}
                labelColor={"white"}
                label={"התחבר עם גוגל"}
                onClick={login_with_google}
              />
              <AppButton
                rounded={false}
                width={inputs.STATIC_WIDTH}
                height={inputs.STATIC_HEIGHT}
                endIcon={facebookIcon}
                labelColor={"white"}
                label={"התחבר עם פייסבוק"}
                onClick={login_with_facebook}
              />
              <AppButton
                rounded={false}
                width={inputs.STATIC_WIDTH}
                height={inputs.STATIC_HEIGHT}
                endIcon={appleIcon}
                labelColor={"white"}
                label={"התחבר עם אפל"}
              />
              <AppButton
                rounded={false}
                width={inputs.STATIC_WIDTH}
                height={inputs.STATIC_HEIGHT}
                endIcon={emailIcon}
                labelColor={"white"}
                label={"התחבר עם אימייל"}
                onClick={() => set_enter_with_web(true)}
              />
            </AppStack>
          </>
        )}
      </div>
    </CenterLayout>
  );
};
