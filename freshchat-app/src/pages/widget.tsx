import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import widgetService from "../lib/widget-service";
import logo from "../assets/react.svg";
import { delay, UserAPIRest } from "../helpers";
import { useQuery } from "@tanstack/react-query";
import { freschatUseCases } from "../lib/freshchat";
import type { UserConfig } from "../helpers";

export const Widget = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    /* Esto es lo que actualmente hace el login */
  }, []);

  const handleLogout = () => {
    /* 
        
            deberia ser algo hacer algo como:
            
            freshchatlib.logout()
            navigate('/');
         */

    // freschatUseCases.logout();
    navigate("/");
  };
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
        <AccountMenu />
        <input
          type="button"
          value="Logout"
          style={{ width: "200px" }}
          onClick={handleLogout}
        />
      </header>
    </div>
  );
};


const useGetInfo = (userId?: UserConfig["userId"]) => {
  const query = useQuery({
    queryKey: ["user-info", userId],
    queryFn: () => UserAPIRest.getUserInfo(userId!),
    enabled: userId ? true : false,
  });
  return query;
};

const useGetUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: UserAPIRest.getUsers,
    // enabled: userId ? true : false,
  });
  return query;
};

export const AccountMenu = () => {
  const [userSelected, setUserSelected] = useState<UserConfig>();
  const usersQuery = useGetUsers();
  const selectAccount = (userId: string) => {
    const user = usersQuery.data?.find((user) => user.userId == userId);
    
    if (!user) {
      throw new Error("Not user finded");
    }
    setUserSelected(user)
    freschatUseCases.changeUser({
      commerceId:'',
      userId:user.userId
    })
    // if (!user.restoreId) {
    //   freschatUseCases.createUser(user.userId);
    //   return;
    // }
    // if (user.restoreId) {
    //   freschatUseCases.login({
    //     externalId: user.userId,
    //     restoreId: user.restoreId,
    //   });
    //   return;
    // }
    // setUserSelected(user);
  };

  return (
    <div>
      <p>selected user: {userSelected?.name}</p>
      <p>Select an account</p>

      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "start",
        }}
      >
        {usersQuery.data?.map((user) => (
          <li>

            <button onClick={() => selectAccount(user.userId)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
