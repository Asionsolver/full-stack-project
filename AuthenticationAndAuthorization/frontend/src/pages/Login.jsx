import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';




export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const {setIsAuth} = useContext(AuthContext);

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3000/api/login", {
      email,
      password,
    });
    // console.log(response);
    // console.log(response.data);
    const data = await response.data;

    console.log(data);
    setIsAuth(true);
    navigate('/user')
  };

  return (
    <div className="flex flex-col gap-3 rounded-md shadow-md w-fit p-3 mx-auto my-[30vh]">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-2 border-2 rounded-lg py-2 w-[300px] border-purple-100 transition-all delay-100 ease-in-out focus:border-purple-500 outline-none"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-2 border-2 rounded-lg py-2 w-[300px] border-purple-100 transition-all delay-100 ease-in-out focus:border-purple-500 outline-none"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-purple-500 rounded-full text-white shadow-md"
        onClick={handleSubmit}
      >
        Log in
      </button>
    </div>
  );
};
