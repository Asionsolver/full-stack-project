import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(email, password);
    axios
      .post("http://localhost:5000/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 200) {
          alert("User Found");
          navigate("/");
          localStorage.setItem("token", res.data.token);
        } else if (res.data.code === 404) {
          alert("Password Wrong");
        } else {
          alert("User Not Found");
        }
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  return (
    <div className="card">
      <h1 className="center">SIGNIN</h1>
      <div className="outcard">
        <div className="input-name">Email</div>
        <input
          className="inputs"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <div className="input-name">Password</div>
        <input
          className="inputs"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button className="btn" onClick={handleSubmit}>
          Signup
        </button>
        <Link style={{display:"block", textAlign:"center", margin:"5px"}} to="/signup">SignUp</Link>
      </div>
    </div>
  );
};
