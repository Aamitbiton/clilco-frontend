import './App.css';
import { Routes, Route } from "react-router-dom";

const Home = ({name}) => (<h1>{name}</h1>)
const Login = () => (<h1>Login</h1>)
const Screen = ({children}) => (<>{children}</>)
function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Screen><Home name={"HOME!!!"} /></Screen>}/>
                <Route path="/login" element={<Screen><Login/></Screen>}/>
            </Routes>
        </div>
    );
}

export default App;
