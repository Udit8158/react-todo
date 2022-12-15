import React, { useState } from "react";

export const AuthContext = React.createContext({
  uuid: "",
  token: "",
  isLoggedIn: false,
  user: null,
  logIn: (token, uuid) => {},
  logOut: () => {},
});

const AuthContextProvider = ({ children }) => {
  const reactTodoApp = JSON.parse(localStorage.getItem("react-todo-app"));

  const [token, setToken] = useState(reactTodoApp ? reactTodoApp.token : null);
  const [uuid, setuuid] = useState(reactTodoApp ? reactTodoApp.uuid : null);
  let user;
  const userLoggedIn = !!token;
  //   console.log(userLoggedIn);
  const logInHandler = (token, uuid, user) => {
    setToken(token);
    setuuid(uuid);
    user = user;
    localStorage.setItem(
      "react-todo-app",
      JSON.stringify({ token: token, uuid: uuid, user: user })
    );
  };
  const logOutHandler = () => {
    setToken(null);
    setuuid(null);
    user = null;
    localStorage.removeItem("react-todo-app");
  };

  const initialCtx = {
    user: user,
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
