import React, {useEffect, useState} from 'react';
import './videoDate.css';
import {set_user_available} from "../../store/user/userFunctions";
import {watch_room} from "../../store/video/videoFunctions";
import {useSelector} from "react-redux";
import {MyVideo} from "./components/myVideo/MyVideo";
import {Tips} from "./components/tips/Tips";
import {RemoteVideo} from "./components/remoteVideo/RemoteVideo";
import {VideoControllers} from "./components/videoControllers/VideoControllers";


export const VideoDate = () => {
    const [dateStarted, setDateStarted] = useState(false);
    const room = useSelector((state) => state.video.room)
    const go_available = async () => {
        await watch_room();
        await set_user_available();
    }
    const init_video_date =async () => {
        setDateStarted(true);
    }
    const watch_video_state = async () => room && await init_video_date();
    useEffect(go_available, [])
    useEffect(watch_video_state, [room])

    return (
        <>
            <div className="video-page">
                <MyVideo room={room}/>
            </div>
        </>

    )
}

