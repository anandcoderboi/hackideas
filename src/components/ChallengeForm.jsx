
import React, { useState } from 'react';
import { useChallengeContext } from '../context/ChallengeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function ChallengeForm() {
  const { challenges, updateChallenges } = useChallengeContext();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to submit a challenge');
      return;
    }

    const alreadySubmitted = challenges.some((challenge) => challenge.createdBy === user.employeeId);
    if (alreadySubmitted) {
      toast.error('You have already submitted a challenge');
      return;
    }

    const newChallenge = {
      id: Date.now(),
      title,
      description,
      tags: tags.split(',').map((tag) => tag.trim()),
      votes: 0,
      createdAt: new Date().toLocaleString(),
      createdBy: user.employeeId,
    };

    const newChallenges = [...challenges, newChallenge];
    updateChallenges(newChallenges);

    localStorage.setItem('challenges', JSON.stringify(newChallenges));

    setTitle('');
    setDescription('');
    setTags('');

    toast.success('Challenge added successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between mb-4">
        <Link to="/" className="bg-green-500 flex items-center justify-center w-32 border rounded-md text-white p-2 font-semibold">
          HOME
        </Link>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Add New Challenge</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-600">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>

     
      <ToastContainer />
    </div>
  );
}

export default ChallengeForm;

