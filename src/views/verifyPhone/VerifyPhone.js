import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./verifyPhone.css";
import PhoneInput from "./components/phoneInput";
import PasswordInput from "./components/passwordInput";
import { send_sms, check_password } from "../../store/auth/authFunctions";
import { useNavigate } from "react-router-dom";

export const VerifyPhone = () => {
  const navigate = useNavigate();
  const [smsSent, setSmsSent] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState(false);
  const send_code_sms = async (phoneNumber) => {
    if (!phoneNumber) phoneNumber = userPhoneNumber;
    let smsSendSuccesfully = await send_sms(phoneNumber);
    if (smsSendSuccesfully) {
      setUserPhoneNumber(phoneNumber);
      setSmsSent(true);
    }
  };
  const check_if_password_verified = async (code) => {
    let code_verified = (await check_password(code)).data;
    if (code_verified) alert("success!");
    else alert("סיסמא שגויה");
  };

  return (
    <>
      {!smsSent ? (
        <PhoneInput smsSent={send_code_sms} />
      ) : (
        <PasswordInput
          checkPassword={check_if_password_verified}
          sendSmsAgain={send_code_sms}
        />
      )}
    </>
  );
};
