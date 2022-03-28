import './App.css';
import {Route, Routes} from "react-router-dom";
import {Layout} from '../layout/Layout'
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
import {Missed} from '../views/missed/Missed'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/add-image" element={<AddImage/>}/>
                    <Route path="/registration-form" element={<RegistrationForm/>}/>

                    {/*private*/}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/view-users" element={<ViewUsers/>}/>
                    <Route path="/lobby" element={<Lobby/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/after-video" element={<AfterVideo/>}/>
                    <Route path="/verify-phone" element={<VerifyPhone/>}/>
                    <Route path="/video-date" element={<VideoDate/>}/>

                    <Route path="*" element={<Missed/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
