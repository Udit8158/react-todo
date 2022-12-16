import { useState } from "react";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../firebase";

const useUpdateProfile = () => {
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

  // utility functions
  const updateBanner = (state, msg, color) => {
    setShowBanner({ state: state, msg: msg, color: color });
  };

  // main update profile functions

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
        // console.log(user);

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
    // console.log(inputData.email);
    updateEmail(user, inputData.email)
      .then(() => {
        // console.log(user);

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
        // console.log(user);

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

  return {
    showBanner,
    inputData,
    setInputData,
    updateNameHandler,
    updateEmailHandler,
    passwordUpdateHandler,
  };
};

export default useUpdateProfile;
