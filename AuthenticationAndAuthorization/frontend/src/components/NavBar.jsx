import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";


axios.defaults.withCredentials = true;

export const NavBar = () => {
  const { isAuth, setIsAuth, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutUser = async () => {
    const res = await axios.post("http://localhost:3000/api/logout", null, {
      withCredentials: true,
    });

    if (res.status === 200) {
      return res;
    }

    return new Error("Error logging out");
  };

  const handleLogout = async () => {
    logoutUser()
      .then(() => {
        setIsAuth(false);
        setUser(null);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col lg:flex-row justify-between px-2 py-3 bg-purple-600 text-white">
      <h2 className="font-bold text-2xl text-center">MERN AUTHENTICATION</h2>
      <div className="flex gap-5 justify-center">
        <Link to="/" className="list-none text-xl cursor-pointer">
          Home
        </Link>
        <Link to="/users" className="list-none text-xl cursor-pointer">
          Users
        </Link>
        <Link
          to="/login"
          className={`list-none text-xl cursor-pointer ${isAuth && "hidden"}`}
        >
          Login
        </Link>
        <Link
          to="#"
          onClick={handleLogout}
          className={`list-none text-xl cursor-pointer ${!isAuth && "hidden"}`}
        >
          Logout
        </Link>
        <Link to="/signup" className="list-none text-xl cursor-pointer">
          SignUp
        </Link>
      </div>
    </div>
  );
};
