import React, {useEffect} from 'react';
import { useNavigate } from "react-router";
import widgetService from '../lib/widget-service';
import logo from '../assets/react.svg';

export const Widget = () =>{
    const navigate = useNavigate();
  
    useEffect(() => {
        /* Esto es lo que actualmente hace el login */
        widgetService.initializeFreshChatWidget();
    },[]);

    const handleLogout = () => {
        /* 
        
            deberia ser algo hacer algo como:
            
            freshchatlib.logout()
            navigate('/');
         */
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

