import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
      <nav className="flex justify-between align-middle text-white  py-4 px-4">
        <div className="text-lg font-bold py-2 px-4">React Todo</div>
        {isLoggedIn && (
          <button
            className="bg-teal-700 py-2 px-4 rounded-md hover:bg-teal-600"
            onClick={logOutHandler}
          >
            Log Out
          </button>
        )}
      </nav>
    </header>
  );
}

export default MainHeader;
