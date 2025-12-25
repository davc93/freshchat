/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useNavigate } from "react-router";
import widgetService from '../lib/widget-service';

export const Login = () =>{
    const navigate = useNavigate();
    const setCookie = (name:any,value:any,days:any) => { // this is for testing purpose
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    const handleLogin = () => {
        /* 
        
            eliminar esto y hacer algo como:
            
            freshchatlib.login({
            externalId:"externalid-23394"
            restoreId:"restore-id-23123"
            })
         */
        console.log('init*******')
        navigate('/widget');
    }
    const clearAllCookies = () => {
        const cookies = document.cookie.split(";");
    
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    }
    useEffect(() => {
        /* 
        esto es lo que actualmente hace el login deberia borrarse
        */
        clearAllCookies(); // this is for testing purpose
        widgetService.initializeFreshChatWidget();
    },[]);
    return (
        <div className="App">
            <header className="login-header">
            <table border={1}>
                <thead>
                    <tr>
                        <th>externalId</th>
                        <th>restoreId</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{'email1@gmail.com'}</td>
                        <td>{'57daff9f-4caa-401c-b63c-42af6e7171c8'}</td>
                    </tr>
                    <tr>
                        <td>{'email2@gmail.com'}</td>
                        <td>{'8c526ed0-d384-4af7-a8ba-d2df1a0fc4e8'}</td>
                    </tr>
                </tbody>
            </table>
                <div className="login-card">
                    <input type="text" placeholder="Enter your email ID - externalId" onChange={(e) => setCookie('externalId', e.target.value, 1)}/><br/>
                    <input type="text" placeholder="Restore ID" onChange={(e) => setCookie('restoreId', e.target.value, 1)}/><br/>
                    <input type="button" value="Login" onClick={handleLogin}/> <br/>
                </div>
            </header>
        </div>
    );
}

