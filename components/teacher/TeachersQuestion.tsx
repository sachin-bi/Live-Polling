// // TeachersQuestion.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { socket } from '@/lib/socket';

interface Props {
  question: string;
  options: {
    text: string;
    percentage: number;
    selected: boolean;
  }[];
}

const TeachersQuestion: React.FC<Props> = ({ question, options }) => {
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    socket.on('poll-complete', () => {
      setIsComplete(true);
    });

    return () => {
      socket.off('poll-complete');
    };
  }, []);

  const handleAskNewQuestion = () => {
    if (isComplete) {
      // Reset flag and navigate to create new poll
      setIsComplete(false);
      router.push('/teacher'); // navigate to question creation
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 font-sans">
      {/* Top Right Button */}
      <div className="w-full flex justify-end mt-8 pr-4">
        <button className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm px-6 py-3 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Poll history
        </button>
      </div>

      {/* Question Section */}
      <div className="w-full max-w-2xl mt-12 mb-8 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Question</h2>
        <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
          <div className="w-full bg-gray-800 text-white p-6">
            <p className="text-lg font-semibold">{question}</p>
          </div>

          {/* Options and Results */}
          <div className="flex flex-col">
            {options.map((option, index) => (
              <div
                key={index}
                className={`relative flex items-center p-6 bg-gray-100 ${
                  index === options.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-200'
                }`}
              >
                <div
                  className="absolute inset-0 bg-purple-200 opacity-50"
                  style={{ width: `${option.percentage}%` }}
                ></div>

                <span
                  className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm mr-4 ${
                    option.selected ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {index + 1}
                </span>
                <p className="relative z-10 text-gray-900 text-lg mr-auto">{option.text}</p>
                <span className="relative z-10 text-gray-900 font-semibold text-lg">
                  {option.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ask a New Question Button */}
      <button
        onClick={handleAskNewQuestion}
        disabled={!isComplete}
        className={`text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 mt-8
          bg-gradient-to-r from-purple-600 to-indigo-600
          ${!isComplete ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-700 hover:to-indigo-700'}
        `}
      >
        + Ask a new question
      </button>

      {/* Chat Icon */}
      <div className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
    </div>
  );
};

export default TeachersQuestion;
