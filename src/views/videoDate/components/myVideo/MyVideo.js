import React, {useEffect, useState, useRef} from 'react';
import './myVideo.css';

export const MyVideo = ({room}) => {
    const [myVideoClass, setMyVideoClass] = useState('my-video');

    const videoRef = useRef();
    const init_my_video = async () => {
        videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    }
    const handle_date_started = async () => {
        setTimeout(() => {
            if (room) setMyVideoClass(`${myVideoClass} video-in-date`)
        }, 2000)
    }
    useEffect(init_my_video, [])
    useEffect(handle_date_started, [room])

    return (
        <>
            <video className={myVideoClass} ref={videoRef} autoPlay={true}/>
        </>
    )
}

