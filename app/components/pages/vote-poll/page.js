"use client"
import React, { useState } from 'react';
import { collection, query, getDocs, where, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from '@/app/firebase'; // Ensure your Firebase config is correctly imported
import { useUserAuth } from "@/app/auth-context";

const VoteInPoll = () => {
    const [pollId, setPollId] = useState('');
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const {user} = useUserAuth();

    const fetchPoll = async () => {
        setLoading(true);
        setError('');
        try {
            const pollsRef = collection(db, "polls");
            const q = query(pollsRef, where("Id", "==", pollId));
            const querySnapshot = await getDocs(q);
            const polls = [];
            querySnapshot.forEach((doc) => {
                polls.push({ id: doc.id, ...doc.data() });
            });
            if (polls.length > 0) {
                setPoll(polls[0]); // Assume the first match is what we want
            } else {
                setError("No such poll found.");
                setPoll(null);
            }
        } catch (err) {
            setError("Failed to fetch poll.");
            console.error(err);
        }
        setLoading(false);
    };

    const vote = async (option) => {
        if (!user) {
            setError("You must be logged in to vote.");
            return;
        }
        try {

            const docRef = await addDoc(collection(db, `polls/${poll.id}/votes/${user.uid}/vote`), {
                vote: option
              });
            // const pollRef = doc(db, "polls", poll.id);
            // const userVote = doc(pollRef, "votes", user.uid);
            // await updateDoc(userVote, { option });
            alert("Your vote has been cast!");
        } catch (err) {
            setError("Failed to record your vote.");
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-peach text-black font-chocolate">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Vote</h1>

                <input
                    type="text"
                    value={pollId}
                    onChange={(e) => setPollId(e.target.value)}
                    placeholder="Enter Poll ID"
                    className="w-full p-2 border-2 border-gray-300 rounded mb-4"
                />
                <button onClick={fetchPoll} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                    Load Poll
                </button>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {poll && (
                    <div className="mt-4">
                        <h2 className="text-lg font-bold mb-2">{poll.question}</h2>
                        <button key={poll.index} onClick={() => vote(poll.option1)}
                                className="w-full mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                                {poll.option1}
                            </button>
                        <button key={poll.index} onClick={() => vote(poll.option2)}
                                className="w-full mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                                {poll.option2}
                        </button>
                    </div>
                )}
            </div>
            <a href='/' className="mt-4 text-lg bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out shadow-lg">
        Go back to Home
      </a>
        </div>
    );
};

export default VoteInPoll;
