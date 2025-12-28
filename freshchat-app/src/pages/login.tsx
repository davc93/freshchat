/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import widgetService from "../lib/widget-service";
import { setCookie } from "../helpers";
import { freschatUseCases } from "../lib/freshchat";

export const Login = () => {
  const navigate = useNavigate();
  const extIdRef = useRef<HTMLInputElement>(null);
  const restoreIdRef = useRef<HTMLInputElement>(null);
  const handleLogin = () => {
    /* 
        
            eliminar esto y hacer algo como:
            
            freshchatlib.login({
            externalId:"externalid-23394"
            restoreId:"restore-id-23123"
            })
         */
    if (extIdRef.current?.value && restoreIdRef.current?.value) {
      console.log("init*******");
      navigate("/widget");

      freschatUseCases.changeUser({
        commerceId:'',
        userId:extIdRef.current.value
      });
      return
    }
    throw new Error("invalid credentials");
    
  };

  useEffect(() => {
    /* 
        esto es lo que actualmente hace el login deberia borrarse
        */
    freschatUseCases.destroy();
  }, []);
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
              <td>{"email1@gmail.com"}</td>
              <td>{"57daff9f-4caa-401c-b63c-42af6e7171c8"}</td>
            </tr>
            <tr>
              <td>{"email2@gmail.com"}</td>
              <td>{"8c526ed0-d384-4af7-a8ba-d2df1a0fc4e8"}</td>
            </tr>
          </tbody>
        </table>
        <div className="login-card">
          <input
            type="text"
            placeholder="Enter your email ID - externalId"
            ref={extIdRef}
          />
          <br />
          <input type="text" placeholder="Restore ID" ref={restoreIdRef} />
          <br />
          <input type="button" value="Login" onClick={handleLogin} /> <br />
        </div>
      </header>
    </div>
  );
};
