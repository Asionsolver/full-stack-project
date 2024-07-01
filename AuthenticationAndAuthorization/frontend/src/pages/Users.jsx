import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from '../context/authContext';
axios.defaults.withCredentials = true;

export const Users = () => {
  const { user, setUser } = useContext(AuthContext);
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
    sendRequest();
  });

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
