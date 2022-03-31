import React, {useEffect, useState} from 'react';
import './videoDate.css';
import {set_user_available} from "../../store/user/userFunctions";
import {go_available,watch_video_state} from "../../store/video/videoFunctions";
import {useSelector} from "react-redux";
import {MyVideo} from "./components/myVideo/MyVideo";
import {Tips} from "./components/tips/Tips";
import {RemoteVideo} from "./components/remoteVideo/RemoteVideo";
import {VideoControllers} from "./components/videoControllers/VideoControllers";


export const VideoDate = () => {
    const room = useSelector((state) => state.video.room);
    const dateStarted = useSelector((state) => state.video.date_started);

    useEffect(go_available, [])
    useEffect(watch_video_state, [room])

    return (
        <>
            <div className="video-page">
                <MyVideo dateStarted={dateStarted}/>
            </div>
        </>

    )
}

