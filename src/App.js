import React, { useContext, useState, useEffect } from 'react';

import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Spinner from './components/Spinner';

function App() {
  const { currentUser } = useContext(AuthContext);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    setAuthCheckComplete(true);
  }, [currentUser]); // The effect runs whenever currentUser changes

  const ProtectedRoute = ({ children }) => {
    if (!authCheckComplete) {
      // While authentication check is ongoing, show a loading spinner
      return <Spinner/>;
    }
    if (!currentUser) {
      // If no user is authenticated, redirect to the login page
      return <Navigate to="/login" />;
    }
    // If a user is authenticated, render the children (protected content)
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<ProtectedRoute><Home/></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;