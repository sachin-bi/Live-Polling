// KickOut.tsx
import React from 'react';

const KickOut: React.FC = () => {
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
        You have been Kicked out !
      </h1>

      {/* Sub-heading */}
      <p className="text-lg text-gray-600 mb-12 text-center max-w-xl px-4">
        Looks like the teacher had removed you from the poll system. Please
        Try again sometime.
      </p>
    </div>
  );
};

export default KickOut;
