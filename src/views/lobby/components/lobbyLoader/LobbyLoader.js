import React, {useEffect, useState} from "react";
import './lobbyLoader.scss'
import { CircularProgress } from "@mui/material";

function LobbyLoader(props) {
    const [currentDote, setCurrentDote] = useState(0)
    useEffect(() => {
        const timer = setInterval(() => {
            change_dotes()
        }, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const change_dotes = () =>{
        let current_dote = null;
        setCurrentDote((value)=>{
            current_dote = value
        })
        if (current_dote >= dotesArray.length - 1) setCurrentDote(0)
        else setCurrentDote(current_dote + 1)
    }
    const dotesArray = ['.','..','...','....','.....','......','.......','........']
    return (
        <div className={'loader-container'}>
            <p className={'loader-dotes'}>{dotesArray[currentDote]} </p>
            <p className={'loader-text'}>מחפש לך דייט </p>
            <p className={'loader-dotes'}>{dotesArray[currentDote]} </p>
        </div>
    );
}

export default LobbyLoader

;