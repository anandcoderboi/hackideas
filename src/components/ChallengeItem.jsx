
import React, { useContext, useState } from 'react';
import { useChallengeContext } from '../context/ChallengeContext';
import { getRandomColor } from '../utils/utils';
import { useAuth } from '../context/AuthProvider';

function ChallengeItem({ challenge }) {
  const { challenges, updateChallenges } = useChallengeContext();
  const { user } = useAuth();
  const [voted, setVoted] = useState(hasUserVoted(challenge.id));

  function hasUserVoted(challengeId) {

    return localStorage.getItem(`voted_${user?.employeeId}_${challengeId}`) === 'true';
  }

  const handleUpvote = () => {
    if (!voted) {
      setVoted(true);

     
      const updatedChallenges = challenges.map((prevChallenge) =>
        prevChallenge.id === challenge.id ? { ...prevChallenge, votes: prevChallenge.votes + 1 } : prevChallenge
      );

     
      updateChallenges(updatedChallenges);
      localStorage.setItem(`voted_${user?.employeeId}_${challenge.id}`, 'true');
    }
  };

  return (
    <div className="relative rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white m-4">
      <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
      <p className="text-gray-600">{challenge.description}</p>
      <div className="flex items-center mt-2 relative">
        {challenge.tags.map((tag) => (
          <span key={tag} style={{ backgroundColor: getRandomColor() }} className="bg-gray-200 text-white px-2 py-1 rounded-full mr-1">
            {tag}
          </span>
        ))}
        <div className='absolute top-0 right-0'>
          <button
            onClick={handleUpvote}
            className={`bg-green-500 text-white p-2 rounded ${voted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={voted}
          >
            Upvote {challenge.votes}
          </button>
        </div>
      </div>
      <p className="text-sm md mt-6 p-2 text-indigo-800">{`Created on ${challenge.createdAt}`}</p>
    </div>
  );
}

export default ChallengeItem;
