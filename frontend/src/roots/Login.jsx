import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import "../style/Login.css";
import { googleAuth } from "./firebase";

export const Login = () => {
  const { login, isAuthenticated, formResponse, setFormResponse } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleGoogleSignin = async () => {
    const provider = new GoogleAuthProvider();
    // sign in with google
    try {
      const response = await signInWithPopup(googleAuth, provider);
      setUser(response.user);
      setFormResponse("Google sign in successful!");
      login();
    } catch (error) {
      // Handle Errors here.
      const credential = GoogleAuthProvider.credentialFromError(error);
      setFormResponse(
        `Google sign in unsuccessful with message ${error} ${credential}`
      );
    }
  };

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate("/chart");
    }
  }, [user, isAuthenticated, navigate]);

  return (
    <div className="logInPage">
      <div className="header">
        <h2>VinePair Audience Insights</h2>
      </div>

      <div className="logInContent">
        <h1 className="authHeader"> login</h1>
        <button
          value="Sign in with Google"
          className="buttons"
          onClick={handleGoogleSignin}
        >
          Sign in with Google
        </button>

        
      </div>
      {formResponse && <p> {formResponse} </p>}
    </div>
  );
};
