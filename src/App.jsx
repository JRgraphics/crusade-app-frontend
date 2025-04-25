import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router";

function App() {
  let navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
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
        console.log(res);
        setAuthLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  };

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

  // const delete_cookie = ( name, path, domain ) => {
  //   if( getCookie( name ) ) {
  //     document.cookie = name + "=" +
  //       ((path) ? ";path="+path:"")+
  //       ((domain)?";domain="+domain:"") +
  //       ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  //   }
  // }

  const logout = () => {
    googleLogout();
    navigate("/login");
  };

  return (
    <>
      {authLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <h1>Authenticated</h1>
          <button onClick={logout}>Logout</button>
          <button onClick={checkAuth}>Check auth</button>
        </div>
      )}
    </>
  );
}

export default App;
