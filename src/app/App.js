import './App.css';
import {Route, Routes} from "react-router-dom";
import {AuthenticatedLayout} from './authenticatedLayout/AuthenticatedLayout'
import {Login} from '../views/login/Login'
import React, {useEffect, useState} from "react";
import {init_app} from "../store/app/appFunctions";
import {useSelector} from "react-redux";
import {Lobby} from "../views/lobby/Lobby";
import {VerifyPhone} from "../views/verifyPhone/VerifyPhone";


function App() {
    const appState = useSelector((state) => state.app)
    useEffect(init_app, [])
            return (<>
        {
            appState.app_ready &&
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<AuthenticatedLayout/>}/>
            </Routes>
        }
    </>);
}

export default App;
