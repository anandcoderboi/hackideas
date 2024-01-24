
import React, { createContext, useState, useEffect, useContext } from 'react';

 const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {

    const storedChallenges = localStorage.getItem('challenges');

    try {

      const parsedChallenges = storedChallenges ? JSON.parse(storedChallenges) : [];
      setChallenges(parsedChallenges);
    } catch (error) {
      console.error('Error parsing challenges from localStorage:', error);
  
      localStorage.setItem('challenges', JSON.stringify([])); 
      setChallenges([]); 
    }
  }, []);

  const updateChallenges = (newChallenges) => {
    setChallenges(newChallenges);

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
