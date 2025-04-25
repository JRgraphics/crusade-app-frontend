import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const PrivateRoute = ({ element }) => {
  const [authLoading, setAuthLoading] = useState(true);
  let navigate = useNavigate();

  const checkAuth = async () => {
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
        setAuthLoading(false);
      })
      .catch((error) => {
        navigate("/login");
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return element;
};

export default PrivateRoute;
