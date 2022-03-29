import React, {useState} from 'react';
import Button from '@mui/material/Button';
import './verifyPhone.css'
import PhoneInput from "./components/phoneInput";
import PasswordInput from "./components/passwordInput";
import {send_sms, check_password} from "../../store/auth/authFunctions";

export const VerifyPhone = () => {
    const [numberVerified, setNumberVerified] = useState(false)
    const send_code_sms = async (phoneNumber)=>{
        let smsSendSuccesfully = await send_sms(phoneNumber)
         if (smsSendSuccesfully){
             setNumberVerified(true)
         }
    }
    const check_if_password_verified = async (code) =>{
        let code_verified =  (await check_password(code)).data
        if (code_verified) alert('סיסמא נכונה')
        else alert('סיסמא שגויה')
    }

    return (
<>
    {
        !numberVerified ?
        <PhoneInput numberVerified = {send_code_sms}/>
        :
        <PasswordInput checkPassword = {check_if_password_verified}/>
    }
</>
    )
}

