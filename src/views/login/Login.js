import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import {login_with_google, login_with_facebook} from '../../store/auth/authFunctions'
import './login.css'
import AppButton from "../../components/AppButton";
import AppStack from "../../components/AppStack";
import Title from "../../components/title/title";
import googleIcon from '../../assets/Google-play-icon.png'
import facebookIcon from '../../assets/Facebook-icon.png'
import appleIcon from '../../assets/apple-icon.png'
import emailIcon from '../../assets/clilco_logo_naked.png'
import LoginWithEmail from "./components/loginWithEmail";


export const Login = ()=>   {
    const [enter_with_web, set_enter_with_web] = useState(false)
    return (
    <div className={'login-container'}>
        <Title title={'ברוכים הבאים'}/>
        {
            enter_with_web ?
                <LoginWithEmail/>
            :
                <AppStack direction={'column'}>
                    <AppButton startIcon={googleIcon} labelColor={'white'} label={"התחבר עם גוגל"} onClick={login_with_google} color="appTurquoise" />
                    <AppButton startIcon={facebookIcon} labelColor={'white'} label={"התחבר עם פייסבוק"} onClick={login_with_facebook} color="appTurquoise" />
                    <AppButton startIcon={appleIcon} labelColor={'white'} label={"התחבר עם אפל"}  color="appTurquoise" />
                    <AppButton startIcon={emailIcon} labelColor={'white'} label={"התחבר עם שם משתמש"} onClick={()=> set_enter_with_web(true)} color="appTurquoise" />
                </AppStack>

        }
    </div>
  );
};

