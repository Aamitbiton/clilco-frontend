import React, {useState} from 'react';
import Button from '@mui/material/Button';
import './verifyPhone.css'
import PhoneInput from "./components/phoneInput";
import PasswordInput from "./components/passwordInput";
import {send_sms} from "../../store/auth/authFunctions";

export const VerifyPhone = () => {
    const [numberVerified, setNumberVerified] = useState(false)
    const send_code_sms =async (phoneNumber)=>{
        let smsSendSuccesfully = await send_sms(phoneNumber)
         if (smsSendSuccesfully)setNumberVerified(true)
    }

    return (
<>
    {
        !numberVerified ?
        <PhoneInput numberVerified = {send_code_sms}/>
        :
        <PasswordInput/>
    }
</>
    )
}

