'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPg() {
  const router = useRouter();

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
        Welcome to the Live Polling System
      </h1>

      {/* Sub-heading */}
      <p className="text-lg text-gray-600 mb-12 text-center max-w-xl">
        Please select the role that best describes you to begin using the live
        polling system
      </p>

      {/* Role Selection Cards */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 w-full max-w-3xl">
        {/* Student Card */}
        <div
          onClick={() => router.push('/student')}
          className="flex-1 p-6 rounded-xl border-2 border-gray-200 shadow-lg
          hover:border-[#7765DA] transition-colors duration-300 cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            I am a Student
          </h2>
          <p className="text-gray-600">
            Join live polls and see results in real-time.
          </p>
        </div>

        {/* Teacher Card */}
        <div
          onClick={() => router.push('/teacher')}
          className="flex-1 p-6 rounded-2xl border-2 border-gray-200 shadow-lg
          hover:border-[#7765DA] transition-colors duration-300 cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            I am a Teacher
          </h2>
          <p className="text-gray-600">
            Create polls and track real-time responses.
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold px-12 py-4 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
        Continue
      </button>
    </div>
  );
}
