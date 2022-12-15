import {
  updateProfile,
  updateEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/UI/Banner";
import { AuthContext } from "../context/auth-context";
import { auth } from "../firebase";

function Profile() {
  const user = auth.currentUser;
  // console.log(user);

  const [inputData, setInputData] = useState({});
  const [error, setError] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const updateNameHandler = () => {
    updateProfile(user, { displayName: inputData.name })
      .then(() => {
        console.log(user);

        authCtx.logOut();
        navigate("/signin");
      })
      .catch((e) => {
        setError("Update Unsuccessful !");
        setShowBanner(true);

        setTimeout(() => {
          setShowBanner(false);
        }, 3000);
        console.log(e);
      });
  };

  const updateEmailHandler = () => {
    console.log(inputData.email);
    updateEmail(user, inputData.email)
      .then(() => {
        console.log(user);

        authCtx.logOut();
        navigate("/signin");
      })
      .catch((e) => {
        setError("Update Unsuccessful !");
        setShowBanner(true);

        setTimeout(() => {
          setShowBanner(false);
        }, 3000);
        console.log(e);
      });
  };

  const verifyEmailHandler = () => {
    sendEmailVerification(user).then(() => {
      // Email verification sent!
      // ...
      console.log("email sent");
    });
  };

  const passwordUpdateHandler = () => {
    const newPassword = inputData.password;

    updatePassword(user, newPassword)
      .then(() => {
        console.log(user);

        authCtx.logOut();
        navigate("/signin");
      })
      .catch((e) => {
        setError("Update Unsuccessful !");
        setShowBanner(true);

        setTimeout(() => {
          setShowBanner(false);
        }, 3000);
        console.log(e);
      });
  };
  return (
    <>
      {showBanner && !error && (
        <Banner message="Successfully updated" color="green" />
      )}
      {showBanner && error && <Banner message="Error Occured" color="red" />}
      <div className="mx-auto w-5/6  my-12 flex flex-col gap-y-4  md:w-4/6 lg:w-3/6 ">
        <h1 className="text-center text-xl text-white">Update Your Profile</h1>

        <div className="flex gap-x-3 ">
          <input
            type="name"
            placeholder="Enter Your Updated Name"
            className="border-2 p-1 w-3/6"
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
          <button
            className="bg-blue-600 p-2 text-white hover:bg-blue-500"
            onClick={verifyEmailHandler}
          >
            Verify Email
          </button>
        </div>

        <div className="flex gap-x-3 ">
          <input
            type="password"
            min={6}
            placeholder="Enter Your Updated Name"
            className="border-2 p-1 w-3/6"
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
