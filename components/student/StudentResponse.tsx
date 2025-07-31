// StudentResponse.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

const StudentResponse: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const handleConnect = () => {
      socket.emit('join-as-student');
      console.log('👨‍🎓 Student joined via socket:', socket.id);
    };

    const handleNewQuestion = (data: any) => {
      console.log('📢 Question received in StudentResponse:', data);
      setQuestion(data.question);
      const optionTexts = data.options.map((opt: any) => opt.text);
      setOptions(optionTexts);
      setSelectedOption(null); // reset on new question
    };

    // Connect socket if not connected
    if (!socket.connected) {
      socket.connect();
    }

    // Set up event listeners
    socket.on('connect', handleConnect);
    socket.on('new-question', handleNewQuestion);

    // If already connected, join as student immediately
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('new-question', handleNewQuestion);
    };
  }, []);

  const handleOptionClick = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      alert('Please select an option before submitting.');
      return;
    }

    socket.emit('submit-response', selectedOption);
    console.log('Submitted option index:', selectedOption);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 font-sans">
      {/* <p className="text-xl mb-6 text-gray-700 font-medium">Welcome, {studentName}!</p> */}

      {/* Question Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Question</h2>
        <div className="flex items-center text-red-500 font-semibold text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>00:15</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-2xl bg-gray-800 text-white p-6 rounded-xl shadow-lg mb-8">
        <p className="text-lg font-semibold">{question || 'Waiting for teacher to start...'}</p>
      </div>

      {/* Options Section */}
      <div className="w-full max-w-2xl flex flex-col gap-4 mb-8">
        {options.map((optionText, index) => (
          <div
            key={index}
            className={`flex items-center bg-gray-100 p-4 rounded-xl border-2 ${selectedOption === index ? 'border-purple-600' : 'border-gray-200'
              } hover:border-purple-600 transition-colors duration-200 cursor-pointer`}
            onClick={() => handleOptionClick(index)}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm mr-4 ${selectedOption === index ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'
                }`}
            >
              {index + 1}
            </span>
            <p className="text-gray-900 text-lg">{optionText}</p>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={question === ''}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold px-12 py-4 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
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

export default StudentResponse;
