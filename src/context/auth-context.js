import React, { useState } from "react";

export const AuthContext = React.createContext({
  uuid: "",
  token: "",
  isLoggedIn: false,
  logIn: (token, uuid) => {},
  logOut: () => {},
});

const AuthContextProvider = ({ children }) => {
  const reactTodoApp = JSON.parse(localStorage.getItem("react-todo-app"));

  const [token, setToken] = useState(reactTodoApp ? reactTodoApp.token : null);
  const [uuid, setuuid] = useState(reactTodoApp ? reactTodoApp.uuid : null);
  const userLoggedIn = !!token;
  //   console.log(userLoggedIn);
  const logInHandler = (token, uuid) => {
    setToken(token);
    setuuid(uuid);
    localStorage.setItem(
      "react-todo-app",
      JSON.stringify({ token: token, uuid: uuid })
    );
  };
  const logOutHandler = () => {
    setToken(null);
    setuuid(null);
    localStorage.removeItem("react-todo-app");
  };

  const initialCtx = {
    uuid: uuid,
    token: token,
    isLoggedIn: userLoggedIn,
    logIn: logInHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={initialCtx}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
