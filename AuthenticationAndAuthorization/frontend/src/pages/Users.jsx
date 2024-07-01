import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
axios.defaults.withCredentials = true;


let firstRender = true;

export const Users = () => {
  const { user, setUser } = useContext(AuthContext);

  const refreshToken = async () => {
    const res = await axios.get("http://localhost:3000/api/refresh", {
      withCredentials: true,
    });

    const data = await res.data;
    console.log(data);
    setUser(data.user);
    return data;
  };

  const sendRequest = async () => {
    const response = await axios.get("http://localhost:3000/api/user", {
      withCredentials: true,
    });
    // console.log(response)
    const data = await response.data;
    // console.log(data);
    setUser(data.user);
  };
  useEffect(() => {
    if (firstRender) {
      sendRequest();
      firstRender = false;
    }

    const interval = setInterval(() => {
      refreshToken();
    }, 10000*29);

    return () => {
      clearInterval(interval);
    };
  },[user]);

  return (
    <div className="flex justify-center items-center h-screen">
      {user && (
        <h1 className=" font-bold text-purple-700 text-3xl">
          Welcome to {user.name} and thanks for visiting my website
        </h1>
      )}
    </div>
  );
};
