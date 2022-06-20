import React from "react";
import './lobbyLoader.scss'
import { CircularProgress } from "@mui/material";

function LobbyLoader(props) {
    return (
        <div className={'loader-container'}>
            <CircularProgress size={50} />
            <p className={'loader-text'}>מחפש התאמה...</p>
        </div>
    );
}

export default LobbyLoader

;