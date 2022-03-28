import './App.css';
import {Routes, Route} from "react-router-dom";
import {AuthRequired} from './routerGuard/AuthRequired'
import {AuthNotRequired} from './routerGuard/AuthNotRequired'
import {Login} from '../views/login/Login'
import {Home} from '../views/home/Home'
import {ViewUsers} from '../views/viewUsers/ViewUsers'
import {Lobby} from '../views/lobby/Lobby'
import {Profile} from '../views/profile/Profile'
import {AddImage} from '../views/addImage/AddImage'
import {AfterVideo} from '../views/afterVideo/AfterVideo'
import {RegistrationForm} from '../views/registrationForm/RegistrationForm'
import {VerifyPhone} from '../views/verifyPhone/VerifyPhone'
import {VideoDate} from '../views/videoDate/VideoDate'

function App() {
    return (
        <Routes>
             {/*<Route element={<AuthNotRequired/>}>*/}
                <Route path="/login" element={<Login/>}/>
                <Route path="/add-image" element={<AddImage/>}/>
                <Route path="/registration-form" element={<RegistrationForm/>}/>
             {/*</Route>*/}

             {/*<Route element={<AuthRequired/>}>*/}
                <Route path="/" element={<Home/>}/>
                <Route path="/view-users" element={<ViewUsers/>}/>
                <Route path="/lobby" element={<Lobby/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/after-video" element={<AfterVideo/>}/>
                <Route path="/verify-phone" element={<VerifyPhone/>}/>
                <Route path="/video-date" element={<VideoDate/>}/>
{/*            </Route>*/}
        </Routes>
    );
}

export default App;
