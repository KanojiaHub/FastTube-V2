import React, { useRef, useState } from "react";
import { checkValidData, validateName } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom"; 
import bgImage from "../images/BG.jpg";

const Login = () => {
  const [signIn, SetSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const fname = useRef(null);
  const Email = useRef(null);
  const Password = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const signInTogler = () => {
    SetSignIn(!signIn);
  };

  const validateData = () => {
    const message = checkValidData(Email.current.value, Password.current.value);
    setErrorMessage(message);

    if (message != null) return;

    if (!signIn) {
      const nameValue = fname.current.value;
      const nameValidationMessage = validateName(nameValue);
      setErrorMessage(nameValidationMessage);

      // console.log("Email: ", Email.current.value);
      // console.log("Password: ", Password.current.value);
      createUserWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          console.log("Error -->");
          const user = userCredential.user;
          

          updateProfile(user, {
            displayName: fname.current.value,
          })
            .then(() => {
              navigate("/"); // Redirect to /
            })
            .catch((error) => {
              setErrorMessage("Error updating profile: " + error.message);
            });
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            setErrorMessage("The email address is already in use. Please use a different email.");
          } 
          else {
            console.log("Error: " + error.message);
            setErrorMessage("Error  in Sign up");
          }
        });
    } 
    else {
      signInWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          navigate("/");
        })
        .catch((error) => {
          setErrorMessage("Error  in Sign in");
        });
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="relative w-full max-w-xs bg-opacity-80 bg-grey rounded-lg">
        <form
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-center text-white text-xl font-bold mb-6">
            {signIn ? "Sign In" : "Sign Up"}
          </h2>

          {!signIn && (
            <div className="mb-4">
              <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                ref={fname}
                type="name"
                placeholder="Enter Your Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              ref={Email}
              type="email"
              placeholder="Enter Your Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              ref={Password}
              type="password"
              placeholder="********"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <p className="text-red-500 font-bold text-sm py-2 text-center">
            {errorMessage}
          </p>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={validateData}
            >
              {signIn ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <p className="text-center text-sm text-blue-500 hover:text-blue-700 cursor-pointer mt-4" onClick={signInTogler}>
            {signIn ? "New User? ➜ Sign Up now" : "Existing user? ➜ Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
