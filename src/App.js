import './App.css';
import { Routes, Route } from "react-router-dom";
import {Login} from '../src/views/login/Login'

const Home = ({name}) => (<h1>{name}</h1>)
const Screen = ({children}) => (<>{children}</>)
function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Screen><Home name={"HOME!!!"} /></Screen>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default App;
