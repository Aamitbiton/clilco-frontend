import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {login_with_google} from '../../store/auth/authFunctions'
import './login.css'


export const Login = ()=>{
    return (
    <div className={'login-container'}>
        <Stack spacing={2} direction="row" >
                <Button onClick={login_with_google} variant="contained">google</Button>
        </Stack>
    </div>

)
}

