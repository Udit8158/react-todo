import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../components/UI/Banner";
import { AuthContext } from "../context/auth-context";
import { auth } from "../firebase";

function SignIn() {
  // some singup states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // use ref
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //Auth context
  const authCtx = useContext(AuthContext);

  // Navigate route
  const navigate = useNavigate();

  // On submit
  const submitHandler = (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    // sign in
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError(false);
        const user = userCredential.user;
        console.log(user);
        authCtx.logIn(user.accessToken, user.uid, user); // Log in done
        setLoading(false);
        setShowBanner(true);

        // console.log(auth.currentUser);

        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
        setError(true);
        setLoading(false);

        setShowBanner(true);
        setTimeout(() => {
          setShowBanner(false);
        }, 3000);
      });
  };
  return (
    <>
      {showBanner && !loading && !error && (
        <Banner message="Successfully logged in !" color="green" />
      )}
      {showBanner && !loading && error && (
        <Banner
          message="Authentication failed check credentials !"
          color="red"
        />
      )}
      <form
        className="mx-auto my-20  flex flex-col justify-center align-middle w-5/6 gap-y-4 md:w-4/6 lg:w-3/6"
        onSubmit={submitHandler}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="border-2 p-1 "
          ref={emailInputRef}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="border-2 p-1 "
          min={6}
          ref={passwordInputRef}
        />
        <button
          type="submit"
          className="bg-blue-600 p-2 text-white hover:bg-blue-500"
        >
          {loading ? "Loading" : "Log In"}
        </button>
        <h2 className="text-center">
          Don't have account yet ?
          <span className="font-medium underline">
            <Link to="/signup"> Create Account</Link>
          </span>
        </h2>
      </form>
    </>
  );
}

export default SignIn;
