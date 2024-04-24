// pages/edit-poll.js
/** @jsxImportSource react */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const EditPoll = () => {
  const [pollId, setPollId] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [minDate, setMinDate] = useState('');
  const [minTime, setMinTime] = useState('');

  useEffect(() => {
    const today = new Date();
    const date = today.toISOString().split('T')[0]; // format: 'YYYY-MM-DD'
    const time = today.toTimeString().split(' ')[0]; // format: 'hh:mm:ss'
    setMinDate(date);
    setMinTime(time);
  }, []);

  const handlePollIdChange = (e) => {
    setPollId(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = () => {
    const newOptions = options.slice(0, options.length - 1);
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-peach text-black font-chocolate">
      <h1 className="text-4xl font-bold font-chocolate mb-6">Edit Poll</h1>
      <div className="w-full max-w-2xl p-5 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="pollId" className="block text-lg font-medium">Poll ID</label>
            <input
              type="text"
              id="pollId"
              value={pollId}
              onChange={handlePollIdChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="question" className="block text-lg font-medium">Question</label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={handleQuestionChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Options</label>
            <div className="flex flex-wrap gap-2">
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="mt-1 flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <button type="button" onClick={addOption} className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none">
                Add Option
              </button>
              {options.length > 2 && (
                <button type="button" onClick={removeOption} className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none">
                  Remove Option
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-lg font-medium">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={minDate}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endTime" className="block text-lg font-medium">End Time</label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                min={endDate === minDate ? minTime : ''}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
          </div>
          <button type="submit" className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none">
            Save Changes
          </button>
        </form>
      </div>
        <a href="/" className="mt-6 text-lg bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out shadow-lg">
          Go back to Home
        </a>

    </div>
  );
};

export default EditPoll;
