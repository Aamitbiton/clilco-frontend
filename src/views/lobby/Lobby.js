import React, {useEffect} from 'react';
import './lobby.css'
import {set_user_available} from "../../store/user/userFunctions";
import {watch_room} from "../../store/video/videoFunctions";

export const Lobby = () => {
    const init_lobby = async () => {
        await watch_room();
        await set_user_available();
    }
    useEffect(init_lobby, [])
    return (
        <>
            <h1>Lobby</h1>
        </>

    )
}

