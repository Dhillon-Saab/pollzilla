/** @jsxImportSource react */
'use client';
import Head from 'next/head';
import Link from "next/link";
import PollingDashboard from './components/PollingDashboard';
import { useUserAuth } from "./auth-context";

export default function Home() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = () => {
    gitHubSignIn(); // Invoke GitHub Sign-In method
  };

  const handleSignOut = () => {
    firebaseSignOut(); // Invoke Firebase Sign-Out method
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-peach">
      {user ? (
        <>
          <Head>
            <title>Polling App</title>
          </Head>
          <PollingDashboard />
          <button
            className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen bg-peach text-black">
          <h1 className="text-3xl font-bold font-chocolate mb-5">Sign-In Pollzilla</h1>
      <div className="w-full max-w-xs">
        
        <div className="bg-white p-8 rounded-lg shadow-lg">

          <p className="text-xl font-chocolate mb-4">Please sign in to Pollzilla.</p>
          <button
            className="flex items-center justify-center w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out shadow-lg"
            onClick={handleSignIn}
          >
            <img src="/login.svg" alt="Sign in icon" width={24} height={24} className="mr-2" />
            Sign In
          </button>
        </div>
      </div>
    </div>
        </>
      )}
    </div>
  );
}
