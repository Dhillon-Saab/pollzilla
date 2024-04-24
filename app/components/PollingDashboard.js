// components/PollingDashboard.js
"use client"; 
import React, { useState, useEffect } from "react";

import Link from 'next/link';
import { useUserAuth } from "../auth-context"; // Adjust the path as needed

const PollingDashboard = () => {
    const { user } = useUserAuth();
  
    useEffect(() => {
        const checkUserLoggedIn = async () => {
          if (user) {
            console.log("Logged IN")
            // If the user is logged in, call loadWeather to fetch weather data
          } else {
            // Handle the case where the user is not logged in
            console.log('User is not logged in');
          }
        };
    
        checkUserLoggedIn(); // Call the function to check user login status
      }, [user]);

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-peach text-black">
      <h1 className="text-4xl font-bold font-chocolate mb-6">PollZilla</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl px-4">
        <Link href='/components/pages/create-poll/'>
        <Card color="bg-red-200" title="Create Poll" description="Create your own custom polls." />
        </Link>
        <Link href='/components/pages/view-poll/'>
        <Card color="bg-green-200" title="View Poll" description="View your existing polls." />
        </Link>
        <Link href='/components/pages/vote-poll/'>
        <Card color="bg-blue-200" title="Vote in Poll" description="Vote on active polls." />
        </Link>
      </div>
    </div>
  );
};

const Card = ({ title, description, color }) => (
  <div className={`card shadow-lg hover:shadow-xl transition-transform transform hover:scale-110 rounded-large ${color} p-10 flex flex-col items-center`}>
    <h2 className="font-chocolate text-4xl mb-3">{title}</h2>
    <p className="text-xl">{description}</p>
  </div>
);

export default PollingDashboard;
