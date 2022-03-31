import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import {AuthenticatedLayout} from './authenticatedLayout/AuthenticatedLayout'
import {Login} from '../views/login/Login'
import React, {useEffect, useState} from "react";
import {init_app} from "../store/app/appFunctions";
import {useSelector} from "react-redux";
import actionsCreator from "../store/actionsCreator";



function App() {
    const appState = useSelector((state) => state.app)
    const navigator = useNavigate()
    const init_navigation = ()=>{
        actionsCreator('GLOBAL_HOOKS',{navigator})
    }


    useEffect(init_app, [])
    useEffect(init_navigation, [])
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
