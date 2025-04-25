import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

function App() {
  let navigate = useNavigate();

  const logout = () => {
    googleLogout();
    Cookies.remove("auth_token");
    navigate("/login");
  };

  return (
    <>
      <div>
        <h1>Authenticated</h1>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default App;
