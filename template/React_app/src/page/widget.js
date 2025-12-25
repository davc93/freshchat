import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import widgetService from './../service/WidgetService';
import logo from './../logo.svg';
import './../App.css';

function App() {
    const navigate = useNavigate();
  
    useEffect(() => {
        widgetService.initializeFreshChatWidget();
    },[]);

    const handleLogout = () => {
        navigate('/');
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>
                <input type="button" value="Logout" style={{width:'200px'}} onClick={handleLogout}/> 
            </header>
        </div>
    );
}

export default App;
