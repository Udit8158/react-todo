import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import React, { useState } from "react";
import Banner from "../components/UI/Banner";
import { auth } from "../firebase";

function Profile() {
  const user = auth.currentUser;
  // console.log(user);

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showBanner, setShowBanner] = useState({
    state: false,
    msg: "",
    color: "",
  });

  const updateBanner = (state, msg, color) => {
    setShowBanner({ state: state, msg: msg, color: color });
  };

  const updateLocalStorage = (user) => {
    const localStorageData = JSON.parse(localStorage.getItem("react-todo-app"));
    localStorage.setItem(
      "react-todo-app",
      JSON.stringify({ ...localStorageData, user })
    );
  };

  const updateNameHandler = () => {
    updateProfile(user, { displayName: inputData.name })
      .then(() => {
        console.log(user);

        updateLocalStorage(user);
        updateBanner(true, "Successfully Update Your Name", "green");

        setInputData((prev) => {
          return { ...prev, name: "" };
        });

        setTimeout(() => {
          updateBanner(false, null, null);
        }, 3000);
      })
      .catch((e) => {
        updateBanner(true, "Error Occured", "red");
        setTimeout(() => {
          updateBanner(false, null, null);
        }, 3000);
        console.log(e);
      });
  };

  const updateEmailHandler = () => {
    console.log(inputData.email);
    updateEmail(user, inputData.email)
      .then(() => {
        console.log(user);

        updateLocalStorage(user);
        updateBanner(true, "Successfully Update Your Email", "green");

        setInputData((prev) => {
          return { ...prev, email: "" };
        });

        setTimeout(() => {
          updateBanner(false, null, null);
        }, 3000);
      })
      .catch((e) => {
        updateBanner(true, "Error Occured Please log out and try again", "red");
        setTimeout(() => {
          updateBanner(false, null, null);
        }, 3000);
        console.log(e);
      });
  };

  const passwordUpdateHandler = () => {
    const newPassword = inputData.password;

    updatePassword(user, newPassword)
      .then(() => {
        console.log(user);

        updateBanner(
          true,
          "Successfully Update Your Password. Please Log In Again",
          "green"
        );

        setInputData((prev) => {
          return { ...prev, password: "" };
        });

        setTimeout(() => {
          updateBanner(false, null, null);
        }, 3000);
      })
      .catch((e) => {
        updateBanner(true, "Error Occured Please log out and try again", "red");
        setTimeout(() => {
          updateBanner(false, null, null);
        }, 3000);

        console.log(e);
      });
  };
  return (
    <>
      {showBanner.state && (
        <Banner message={showBanner.msg} color={showBanner.color} />
      )}
      {/* {showBanner && error && <Banner message="Error Occured" color="red" />} */}
      <div className="mx-auto w-5/6  my-12 flex flex-col gap-y-4  md:w-4/6 lg:w-3/6 ">
        <h1 className="text-center text-xl text-white">Update Your Profile</h1>

        <div className="flex gap-x-3 ">
          <input
            type="name"
            placeholder="Enter Your Updated Name"
            className="border-2 p-1 w-3/6"
            value={inputData.name}
            onChange={(e) => {
              setInputData((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />

          <button
            className="bg-blue-600 p-2 text-white hover:bg-blue-500"
            onClick={updateNameHandler}
          >
            Update Name
          </button>
        </div>

        <div className="flex gap-x-3 ">
          <input
            type="email"
            placeholder="Enter Your Updated Email"
            className="border-2 p-1 w-3/6"
            value={inputData.email}
            onChange={(e) => {
              setInputData((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />

          <button
            className="bg-blue-600 p-2 text-white hover:bg-blue-500"
            onClick={updateEmailHandler}
          >
            Update Email
          </button>
        </div>

        <div className="flex gap-x-3 ">
          <input
            type="password"
            min={6}
            placeholder="Enter Your Updated Password"
            className="border-2 p-1 w-3/6"
            value={inputData.password}
            onChange={(e) => {
              setInputData((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
          />

          <button
            className="bg-blue-600 p-2 text-white hover:bg-blue-500"
            onClick={passwordUpdateHandler}
          >
            Update Password
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
