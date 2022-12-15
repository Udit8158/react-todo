import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainHeader from "./components/Layout/MainHeader";
import { AuthContext } from "./context/auth-context";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className="h-screen bg-slate-500">
      <MainHeader />
      <Routes>
        {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
        {!isLoggedIn && <Route path="/signin" element={<SignIn />} />}
        {isLoggedIn && <Route path="/home" element={<Home />} />}

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/signin"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
