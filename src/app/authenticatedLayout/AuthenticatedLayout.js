import {Routes, Route, Navigate, useLocation, useNavigate} from "react-router-dom";
import {Home} from '../../views/home/Home'
import {ViewUsers} from '../../views/viewUsers/ViewUsers'
import {Lobby} from '../../views/lobby/Lobby'
import {Profile} from '../../views/profile/Profile'
import {AddImage} from '../../views/addImage/AddImage'
import {AfterVideo} from '../../views/afterVideo/AfterVideo'
import {RegistrationForm} from '../../views/registrationForm/RegistrationForm'
import {VerifyPhone} from '../../views/verifyPhone/VerifyPhone'
import {VideoDate} from '../../views/videoDate/VideoDate'
import {Missed} from '../../views/missed/Missed'
import React, {useEffect} from "react";
import {useSelector} from "react-redux";


export const AuthenticatedLayout = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user)
    const appState = useSelector((state) => state.app)

// todo make this prettier
    // if app is ready and finished setching user then check if user then routs else go to login

    return (
        <>
            {appState.finished_fetching_user ? (
                userState.user?.id ?
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/add-image" element={<AddImage/>}/>
                        <Route path="/registration-form" element={<RegistrationForm/>}/>
                        <Route path="/view-users" element={<ViewUsers/>}/>
                        <Route path="/lobby" element={<Lobby/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/after-video" element={<AfterVideo/>}/>
                        <Route path="/verify-phone" element={<VerifyPhone/>}/>
                        <Route path="/video-date" element={<VideoDate/>}/>
                        <Route path="*" element={<Missed/>}/>
                    </Routes>
                    : <Navigate to="login" state={{from: location}} replace/>
            ) : null}

        </>
    );
}
