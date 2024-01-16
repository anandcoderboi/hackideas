// ChallengeContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

 const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    // Fetch challenges data from local storage
    const storedChallenges = localStorage.getItem('challenges');

    try {
      // If storedChallenges is not null or undefined, parse it; otherwise, set an empty array
      const parsedChallenges = storedChallenges ? JSON.parse(storedChallenges) : [];
      setChallenges(parsedChallenges);
    } catch (error) {
      console.error('Error parsing challenges from localStorage:', error);
      // Handle error (e.g., clear localStorage or set default value)
      localStorage.setItem('challenges', JSON.stringify([])); // Set an empty array if there's an error
      setChallenges([]); // Set the state to an empty array
    }
  }, []);

  const updateChallenges = (newChallenges) => {
    setChallenges(newChallenges);
    // Update local storage with new challenges
    localStorage.setItem('challenges', JSON.stringify(newChallenges));
  };

  return (
    <ChallengeContext.Provider value={{ challenges, updateChallenges }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallengeContext = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallengeContext must be used within a ChallengeProvider');
  }
  return context;
};
