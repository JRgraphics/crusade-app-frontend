import { useState, useEffect } from "react";
import axios from "axios";
import GoogleAuth from "./components/GoogleAuth";
import { useNavigate } from "react-router";

function Login() {
  let navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google`,
        {
          clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        },
        {
          headers: {
            Authorization: getCookie("auth_token"),
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

  // const getCookie = (key) => {
  //   var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  //   return b ? b.pop() : "";
  // };

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

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
