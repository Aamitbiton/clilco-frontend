import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import actionsCreator from "./store/actionsCreator";
import USER_STORE_CONSTANTS from "./store/user/constants"
const Home = ({name}) => (<h1>{name}</h1>)
const Login = () => (<h1>Login</h1>)
const Screen = ({children}) => (<>{children}</>)
function App() {
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch();
    const {SET_USER} = USER_STORE_CONSTANTS
    return (
        <div>
            <Routes>
                <Route path="/" element={<Screen><Home name={"HOME!!!"} />
                    <h1>{JSON.stringify(userState)}</h1>
                    <input placeholder={"type and change state"} onChange={(e)=> dispatch(actionsCreator(SET_USER, e.target.value))}/>
                </Screen>}/>
                <Route path="/login" element={<Screen><Login/></Screen>}/>
            </Routes>
        </div>
    );
}

export default App;
