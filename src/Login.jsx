import { useState, useEffect } from "react";
import axios from "axios";
import GoogleAuth from "./components/GoogleAuth";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

function Login() {
  let navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        `/api/auth/google`,
        {
          clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        },
        {
          headers: {
            Authorization: Cookies.get("auth_token"),
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {})
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <>
      <GoogleAuth handleLogin={handleLogin} />
    </>
  );
}

export default Login;
