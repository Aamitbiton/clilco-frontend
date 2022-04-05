import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import {AuthenticatedLayout} from './authenticatedLayout/AuthenticatedLayout';
import {Login} from '../views/login/Login';
import React, {useEffect} from "react";
import {init_app} from "../store/app/appFunctions";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";



function App() {
    const appState = useSelector((state) => state.app);
        const navigator = useNavigate();


    useEffect( () => init_app({navigator}), [])

    return (<div className={'app-container'}>
        {
            appState.app_ready &&
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<AuthenticatedLayout/>}/>
            </Routes>
        }
    </div>);
}

export default App;
