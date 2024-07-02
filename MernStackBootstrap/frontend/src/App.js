import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import ProtectedRoutes from './services/protectedRoutes';

function App() {
  return (
    <div >
      <Router>
        <Routes>
        
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>   
      </Router>
    </div>
  );
}

export default App;
