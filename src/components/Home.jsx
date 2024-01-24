
import React from 'react';
import { Link } from 'react-router-dom';
import ChallengeList from './ChallengeList';

function Home() {
  return (
    <div className="container m-auto ">
      

      <Link to="/add-challenge" className=" flex items-center justify-center border rounded-md text-white font text-3xl bg-indigo-300 p-2  mb-4 ">
        Add Challenge +
      </Link>


      <ChallengeList />
    </div>
  );
}

export default Home;
