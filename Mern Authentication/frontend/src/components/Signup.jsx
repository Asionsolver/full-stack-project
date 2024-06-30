import axios from "axios";
import { useState } from "react";

import { Link } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(email, password);
    axios
      .post("http://localhost:5000/signup", {
        email:email,
        password:password,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <div className="card">
      <h1 className="center">SIGNUP</h1>
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
        <Link
          style={{ display: "block", textAlign: "center", margin: "5px" }}
          to="/signin"
        >
          SignIn
        </Link>
      </div>
    </div>
  );
};
