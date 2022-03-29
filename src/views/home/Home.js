import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import './home.css'


export const Home = () => {

    return (
        <>
            <h1>home</h1>
            <Link to="/lobby"><Button variant="contained">Start Dating!</Button></Link>
        </>

    )
}

