import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './login.css'


export const Login = ()=>{
    const navigate = useNavigate()
    const goToHome = ()=>{
        navigate('/')
    }
    return (
    <div className={'login-container'}>
        <Stack spacing={2} direction="row" >
        {['Google', 'Apple', 'Facebook'].map((connectMethod)=>
                <Button onClick={goToHome} variant="contained">{connectMethod}</Button>
        )}
        </Stack>
    </div>

)
}

