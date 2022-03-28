import React, {useState} from 'react';
import Button from '@mui/material/Button';
import './verifyPhone.css'
import PhoneInput from "./components/phoneInput";
import PasswordInput from "./components/passwordInput";
import {send_sms} from "../../store/auth/authFunctions";

export const VerifyPhone = () => {
    const [numberVerified, setNumberVerified] = useState(false)
    const send_code_sms =async (phoneNumber)=>{
        let smsSendSuccefuly = await send_sms(phoneNumber)
         if (smsSendSuccefuly)setNumberVerified(true)
    }

    return (
<>
    {!numberVerified ?
        <PhoneInput numberVerified = {(value)=>{send_code_sms(value)}}/>
        :
        <PasswordInput/>
    }

</>


    )
}

