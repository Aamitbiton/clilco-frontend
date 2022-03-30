import React, {useEffect} from 'react';
import './videoDate.css';
import {set_user_available} from "../../store/user/userFunctions";
import {watch_room} from "../../store/video/videoFunctions";
import {useSelector} from "react-redux";

export const VideoDate = () => {
    const videoState = useSelector((state) => state.video)
    const init_lobby = async () => {
        await watch_room();
        await set_user_available();
    }
    useEffect(init_lobby, [])
    return (
        <>
            <div className="video-page">

                <div className="my-video">
                    my-video
                </div>

                <div className="remote-video">
                    remote-video
                </div>

            </div>
        </>

    )
}

