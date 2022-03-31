import React, {useEffect, useState, useRef} from 'react';
import './myVideo.css';

export const MyVideo = ({dateStarted}) => {
    const videoRef = useRef();
    const init_my_video = async () => {
        videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    }
    useEffect(init_my_video, [])

    return (
        <>
            <video className={dateStarted ? 'my-video-in-date' : 'my-video-before-date'}
                   ref={videoRef} autoPlay={true}
                   muted={true}/>
        </>
    )
}

