import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import './startDate.css'
import {Link} from "@mui/material";


export const StartDate = ({handle_start_date_click}) => {
    return (
        <>
            <div className="start-date">
                <Link to="/video-date">
                    <Button onClick={handle_start_date_click} className="start-btn" variant="contained">Start Dating!</Button>
                </Link>
            </div>
        </>

    )
}

