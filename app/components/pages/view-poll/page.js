"use client"; 
import React, { useState, useEffect } from 'react';
import { useUserAuth } from '@/app/auth-context';
import { getPoll, deletePoll } from '@/app/firestore';



const ViewPolls = () => {
    const [polls, setPolls] = useState([]);
    const {user} = useUserAuth();
  
    // useEffect(() => {
    //   const fetchPolls = async () => {
        
    //       const userPolls = await getPoll(user.uid);
    //       setPolls(await getPoll(user.uid));
    //   };
  
    //   fetchPolls();
    // }, []);
  
    const handleDelete = async (pollId) => {
      await deletePoll(user.uid, pollId);
      setPolls(polls.filter(poll => poll.Id !== pollId));
    };

    const loadPolls = async()=>{
        const polls = await getPoll(user.uid);
        setPolls(polls.map(poll => ({
            ...poll,
            EndTime: poll.EndTime.toDate() // Convert Firestore timestamp to JavaScript Date object
          })));
    }

    useEffect(() =>{
        loadPolls();
    }, []);
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-peach text-black font-chocolate">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Your Polls</h1>
          {polls.length > 0 ? (
            polls.map((poll, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <h2 className="text-lg font-semibold">Poll ID: {poll.Id}</h2>
                <p className="my-1">Question: {poll.question}</p>
                <p className="my-1">Option 1: {poll.option1}</p>
                <p className="my-1">Option 2: {poll.option2}</p>
                <p className="my-1">End Time: {poll.EndTime.toLocaleString()}</p>
                <button
                  onClick={() => handleDelete(poll.Id)}
                  className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded transition duration-300 ease-in-out"
                >
                  Delete Poll
                </button>
              </div>
            ))
          ) : (
            <p className="text-center">No polls found. Create some polls to see them here.</p>
          )}
        </div>
        <a href='/' className="mt-4 text-lg bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out shadow-lg">
        Go back to Home
      </a>
      </div>
    );
  };
  
  export default ViewPolls;
  