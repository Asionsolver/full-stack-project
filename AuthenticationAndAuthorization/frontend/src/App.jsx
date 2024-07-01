import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavBar } from './components/NavBar';
import { AuthContext } from './context/authContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Users } from './pages/Users';


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  return (
    <>
    <AuthContext.Provider value={{isAuth, setIsAuth, user, setUser}}>
      <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<Users />} />
          <Route path="*" element={<div>Not Found</div>} />

        </Routes>
      </Router>
    </AuthContext.Provider>
    </>
  );
}

export default App;
