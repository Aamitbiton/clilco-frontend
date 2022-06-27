import React, { useState } from "react";
import "./verifyPhone.css";
import PhoneInput from "./components/phoneInput";
import PasswordInput from "./components/passwordInput";
import {
  send_sms,
  check_password,
  signOut,
} from "../../store/auth/authFunctions";
import Title from "../../components/title/title";
import CenterLayout from "../../components/CenterLayout";
import { FORBIDDEN_MESSAGE, WRONG_PASSWORD_MESSAGE } from "./utils";
import LogoutButton from "../../components/LogoutButton";

export const VerifyPhone = () => {
  const [smsSent, setSmsSent] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState(false);
  const handle_existed_phone_validation = async () => {
    alert(FORBIDDEN_MESSAGE);
    await signOut();
  };
  const send_code_sms = async (phoneNumber) => {
    if (!phoneNumber) phoneNumber = userPhoneNumber;
    const res = await send_sms(phoneNumber);
    console.log(res);
    if (res.status === 403) {
      return handle_existed_phone_validation();
    }
    if (res.status === 200) {
      setUserPhoneNumber(phoneNumber);
      setSmsSent(true);
    }
  };
  const check_if_password_verified = async (code) => {
    const res = await check_password(code);
    console.log(res);
    if (res.status === 403) alert(WRONG_PASSWORD_MESSAGE);
  };

  return (
    <CenterLayout direction={"column"}>
      <div>
        <div style={{ position: "relative", left: 100 }}>
          <LogoutButton />
        </div>
      </div>
      <Title title={"אימות פלאפון"} mb={2} />
      {!smsSent ? (
        <PhoneInput smsSent={send_code_sms} />
      ) : (
        <PasswordInput
          checkPassword={check_if_password_verified}
          sendSmsAgain={send_code_sms}
        />
      )}
    </CenterLayout>
  );
};
