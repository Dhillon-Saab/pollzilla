// pages/create-poll.js
/** @jsxImportSource react */
'use client';
import { useUserAuth } from '@/app/auth-context';
import { addPoll } from '@/app/firestore';
import React, { useState } from 'react';


const CreatePoll = () => {

    const {user} = useUserAuth();
    const [isVisible, setIsVisible] = useState(false);  // Default visibility

    const [pollData, setPollData] = useState({
        question: '',
        option1: '',
        option2: '',
        endDate: '',
        endTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPollData({
            ...pollData,
            [name]: value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const completeDateTime = `${pollData.endDate}T${pollData.endTime}:00`;

        const timestamp = new Date(completeDateTime);

        const id = Math.random(10,99).toString();

        const newId = Math.round(id*10000).toString();

        setIsVisible(!isVisible);  // Toggle the visibility state
        console.log(newId);

        addPoll(user.uid, {
            Id: newId,
            question: pollData.question,
            option1: pollData.option1,
            option2: pollData.option2,
            EndTime: timestamp
        })


    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-peach text-black font-chocolate">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Create a Poll</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="font-medium">Question:</label>
                        <input
                        required
                            type="text"
                            name="question"
                            value={pollData.question}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border-2 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">Option 1:</label>
                        <input
                        required
                            type="text"
                            name="option1"
                            value={pollData.option1}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border-2 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">Option 2:</label>
                        <input
                        required
                            type="text"
                            name="option2"
                            value={pollData.option2}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border-2 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">End Date:</label>
                        <input
                        required
                            type="date"
                            name="endDate"
                            value={pollData.endDate}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border-2 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">End Time:</label>
                        <input
                            type="time"
                            name="endTime"
                            value={pollData.endTime}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border-2 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-col"> 
                    {isVisible && <label className="font-medium text-green" >Poll Created successfully</label>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                        Create Poll
                    </button>
                </form>
                
            </div>
            <a href='/' className="mt-4 text-lg bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out shadow-lg">
        Go back to Home
      </a>
        </div>
    );
};

export default CreatePoll;
