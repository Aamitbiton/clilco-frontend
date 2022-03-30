import React, {useEffect, useState} from 'react';
import './videoDate.css';
import {set_user_available} from "../../store/user/userFunctions";
import {watch_room} from "../../store/video/videoFunctions";
import {useSelector} from "react-redux";
import {MyVideo} from "./myVideo/MyVideo";
import {Tips} from "./tips/Tips";
import {RemoteVideo} from "./remoteVideo/RemoteVideo";
import {VideoControllers} from "./videoControllers/VideoControllers";


export const VideoDate = () => {
    const [dateStarted, setDateStarted] = useState(false);
    const videoState = useSelector((state) => state.video)
    const go_available = async () => {
        await watch_room();
        await set_user_available();
    }
    const init_video_date =async () => {
        setDateStarted(true);
    }
    const watch_video_state = async () => videoState?.room && await init_video_date()
    useEffect(go_available, [])
    useEffect(watch_video_state, [videoState])

    return (
        <>
            {/*{JSON.stringify(videoState)}*/}
            <div className="video-page">
                <MyVideo dateStarted={dateStarted}/>
            </div>
        </>

    )
}

