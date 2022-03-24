import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {runSignInWithGoogle} from '../../store/auth/authFunctions'
import './login.css'


export const Login = ()=>{
    const navigate = useNavigate()

    return (
    <div className={'login-container'}>
        <Stack spacing={2} direction="row" >
                <Button onClick={runSignInWithGoogle} variant="contained">google</Button>
        </Stack>
    </div>

)
}

