import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

function MainHeader() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const navigate = useNavigate();

  const logOutHandler = () => {
    authCtx.logOut();
    navigate("/signin");
  };
  return (
    <header className=" bg-slate-600">
      <nav className="flex justify-between align-middle text-white py-2  px-4">
        <div className="text-lg font-bold py-2 px-4">React Todo</div>
        <div className="flex gap-3 items-center">
          {isLoggedIn && <Link to="/home">Home</Link>}
          {isLoggedIn && <Link to="/profile">Profile</Link>}
          {isLoggedIn && (
            <button
              className="bg-teal-700 py-2 px-4 rounded-md hover:bg-teal-600"
              onClick={logOutHandler}
            >
              Log Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default MainHeader;
