import React from "react";
import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const GoogleAuth = (props) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    axios
      .post(
        `/api/auth/google?login=true`,
        {
          clientId: credentialResponse.clientId,
        },
        {
          headers: {
            Authorization: credentialResponse.credential,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        props.handleLogin();
      });
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleLoginSuccess(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};
export default GoogleAuth;
