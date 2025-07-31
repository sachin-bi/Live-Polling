'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const StudentPg: React.FC = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    // Store name in sessionStorage (per tab)
    // sessionStorage.setItem('studentName', name.trim());

    // Redirect to /student/sheet
    router.push('/student/sheet');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans">
      {/* Top Badge */}
      <div className="flex items-center bg-gradient-to-r from-purple-600 to-purple-800 text-white text-sm px-4 py-2 rounded-full shadow-lg mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span>Intervue Poll</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center leading-tight">
        Lets Get Started
      </h1>

      {/* Sub-heading */}
      <p className="text-lg text-gray-600 mb-12 text-center max-w-xl px-4">
        If you&apos;re a student, you will be able to <span className="font-semibold text-gray-900">submit your answers</span>, participate in live
        polls, and see how your responses compare with your classmates
      </p>

      {/* Name Input Section */}
      <div className="w-full max-w-md mb-12 px-4">
        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-3">
          Enter your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Sachin Tendulkar"
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm
                     focus:ring-purple-500 focus:border-purple-500
                     bg-gray-100 text-gray-900 placeholder-gray-500 text-lg"
        />
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold px-12 py-4 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
      >
        Continue
      </button>
    </div>
  );
};

export default StudentPg;
