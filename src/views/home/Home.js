import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './home.css'
import {useSelector} from "react-redux";
import {StartDate} from "./components/startDate/StartDate";
import {NotDateTime} from "./components/notDateTime/NotDateTime";
import {APP_ROUTS} from '../constants'


export const Home = () => {
    const navigate = useNavigate();
    const videoState = useSelector((state) => state.video);
    const [isVideoTime, setIsVideoTime] = useState(false);

    useEffect(() => {
        setIsVideoTime(check_if_speed_dating_time());
    }, [videoState])

    const check_if_speed_dating_time = () => new Date().getTime() > videoState.speed_date_time;
    const handle_start_date_click = ()=>{
        navigate(APP_ROUTS.VIDEO_DATE)
    }
    return (
        <>
            <div className="home">
                <div className="header">
                    <h1 className="title">home</h1>
                </div>
                <div className="content">
                    {
                        isVideoTime ?
                            <StartDate handle_start_date_click={handle_start_date_click}/>
                            :
                            <NotDateTime/>
                    }
                </div>
            </div>
        </>

    )
}

