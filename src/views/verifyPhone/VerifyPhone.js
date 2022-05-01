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

export const VerifyPhone = () => {
  const [smsSent, setSmsSent] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState(false);
  const handle_existed_phone_validation = async () => {
    alert(FORBIDDEN_MESSAGE);
    await signOut();
  };
  const send_code_sms = async (phoneNumber) => {
    if (!phoneNumber) phoneNumber = userPhoneNumber;
    let smsSendSuccesfully = await send_sms(phoneNumber);
    if (smsSendSuccesfully.data.status === 403) {
      return handle_existed_phone_validation();
    }
    if (smsSendSuccesfully) {
      setUserPhoneNumber(phoneNumber);
      setSmsSent(true);
    }
  };
  const check_if_password_verified = async (code) => {
    let code_verified = (await check_password(code)).data;
    if (!code_verified) alert(WRONG_PASSWORD_MESSAGE);
  };

  return (
    <CenterLayout direction={"column"}>
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
