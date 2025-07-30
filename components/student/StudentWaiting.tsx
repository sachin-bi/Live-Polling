// StudentWaiting.tsx
import React from 'react';

const StudentWaiting: React.FC = () => {
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

      {/* Loading Spinner */}
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-600 mb-8"></div>

      {/* Waiting Message */}
      <p className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
        Wait for the teacher to ask questions..
      </p>

      {/* Chat Icon (Fixed at bottom right) */}
      <div className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </div>
    </div>
  );
};

export default StudentWaiting;
