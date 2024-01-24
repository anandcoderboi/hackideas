
import React, { useState, useEffect } from "react";
import ChallengeItem from "./ChallengeItem";
import { useChallengeContext } from "../context/ChallengeContext";

function ChallengeList() {
  const { challenges, updateChallenges } = useChallengeContext();
  const [sortedChallenges, setSortedChallenges] = useState([...challenges]);
  const [sortOrder, setSortOrder] = useState("desc"); 
  const [sortField, setSortField] = useState("createdAt"); 

  useEffect(() => {
    sortChallenges();
  }, [challenges, sortOrder, sortField]);

  const sortChallenges = () => {
    const sorted = [...challenges].sort((a, b) => {
      if (sortField === "createdAt") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortField === "votes") {
        return sortOrder === "asc" ? a.votes - b.votes : b.votes - a.votes;
      }

      return 0;
    });

    setSortedChallenges(sorted);
  };

  const handleSortByDate = (order) => {
    setSortOrder(order);
    setSortField("createdAt");
  };

  const handleSortByVotes = (order) => {
    setSortOrder(order);
    setSortField("votes");
  };

  return (
    <div>
      <div className=" flex justify-between m-4 p-4">
        <div>
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleSortByDate("asc")}
          >
            Sort by Oldest
          </button>
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleSortByDate("desc")}
          >
            Sort by Newest
          </button>
        </div>
        <div>
          <button
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleSortByVotes("asc")}
          >
            Sort by Least Votes
          </button>
          <button
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleSortByVotes("desc")}
          >
            Sort by Most Votes
          </button>
        </div>
      </div>
      {sortedChallenges.map((challenge) => (
        <ChallengeItem
          key={challenge.id}
          challenge={challenge}
          updateChallenges={updateChallenges}
        />
      ))}
    </div>
  );
}

export default ChallengeList;
