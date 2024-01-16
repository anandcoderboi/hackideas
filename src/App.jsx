// App.js
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChallengeProvider } from './context/ChallengeContext';
import { AuthProvider } from './context/AuthProvider';
import Home from './components/Home';
import ChallengeForm from './components/ChallengeForm';
import Login from './components/Login';
import Navbar from './components/Navbar'; // Import Navbar component

function App() {
  return (
    <ChallengeProvider>
      <AuthProvider>
        <Router>
         
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-challenge" element={<ChallengeForm />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChallengeProvider>
  );
}

export default App;
