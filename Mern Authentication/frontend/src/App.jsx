// import { useState } from 'react'

import { Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from './components/Home';
import { SignIn } from './components/SignIn';
import { Signup } from "./components/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
