import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { ChangePassword } from './pages/ChangePassword';
import { ForgetPassword } from './pages/ForgetPassword';
import { Home } from './pages/Home';
import ProtectedRoutes from './services/protectedRoutes';
// import { ChangePassword } from './pages/ChangePassword';

function App() {
  return (
    <div >
      <Router>
        <Routes>
        
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ForgetPassword />} />
          <Route path="/user/reset/:id/:token" element={<ChangePassword />} />
          <Route path='/' element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>   
      </Router>
    </div>
  );
}

export default App;
