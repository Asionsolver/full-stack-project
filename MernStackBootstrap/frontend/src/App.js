import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>   
      </Router>
    </div>
  );
}

export default App;
