'use client';

import React, { useState } from 'react';
import OptionInput from '@/components/teacher/OptionInput';
import { useRouter } from 'next/navigation';
import { socket } from '@/lib/socket'; // Use the centralized socket

const TeacherPg: React.FC = () => {
  const [options, setOptions] = useState([
    { value: '', isCorrect: false },
    { value: '', isCorrect: false },
  ]);
  const [question, setQuestion] = useState('');
  const [timeLimit, setTimeLimit] = useState(60); // default to 60 seconds

  const router = useRouter();

  const handleAskQuestion = () => {
    if (!question.trim()) {
      alert('Please enter a question');
      return;
    }

    const formattedOptions = options
      .filter((opt) => opt.value.trim()) // remove empty options
      .map((opt) => ({
        text: opt.value,
        isCorrect: opt.isCorrect || false,
      }));

    if (formattedOptions.length < 2) {
      alert('Please enter at least 2 options');
      return;
    }

    // Ensure socket is connected before emitting
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('new-question', {
      question,
      options: formattedOptions,
      duration: timeLimit,
    });

    router.push('/teacher/results');
  };

  const handleOptionChange = (index: number, newValue: string) => {
    const updated = [...options];
    updated[index].value = newValue;
    setOptions(updated);
  };

  const handleCorrectChange = (index: number, isCorrect: boolean) => {
    const updated = [...options].map((opt, i) => ({
      ...opt,
      isCorrect: i === index ? isCorrect : false,
    }));
    setOptions(updated);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 font-sans">
      {/* Top Badge */}
      <div className="flex items-center bg-gradient-to-r from-purple-600 to-purple-800 text-white text-sm px-4 py-2 rounded-full shadow-lg mt-8 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Intervue Poll</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center leading-tight">
        Lets Get Started
      </h1>

      {/* Sub-heading */}
      <p className="text-lg text-gray-600 mb-12 text-center max-w-xl px-4">
        you will have the ability to create and manage polls, ask questions, and monitor your students responses in real-time.
      </p>

      {/* Question Input Section */}
      <div className="w-full max-w-3xl mb-8 px-4">
        <div className="flex justify-between items-center mb-3">
          <label htmlFor="question" className="block text-lg font-medium text-gray-700">
            Enter your question
          </label>
          <div className="relative">
            <select
              id="timeLimit"
              value={timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value))}
              className="appearance-none bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl py-2 pl-4 pr-10 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
            >
              <option value={30}>30 seconds</option>
              <option value={60}>60 seconds</option>
              <option value={90}>90 seconds</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative">
          <textarea
            id="question"
            placeholder="What is the capital of India?"
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-gray-100 text-gray-900 placeholder-gray-500 text-lg resize-none"
          />

          <div className="absolute bottom-3 right-4 text-sm text-gray-500">0/100</div>
        </div>
      </div>

      {/* Options Section */}
      <div className="w-full max-w-3xl mb-12 px-4">
        {options.map((opt, index) => (
          <React.Fragment key={index}>
            <OptionInput
              index={index}
              value={opt.value}
              onChange={(value) => handleOptionChange(index, value)}
              isCorrect={opt.isCorrect}
              onCorrectChange={(correct) => handleCorrectChange(index, correct)}
            />
          </React.Fragment>
        ))}

        {/* yos Add More Option Button */}
        <button
          onClick={() => setOptions([...options, { value: '', isCorrect: false }])}
          className="mt-6 flex items-center text-purple-600 font-semibold py-2 px-4 rounded-full hover:bg-purple-50 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add More option
        </button>
      </div>

      {/* Ask Question Button (Bottom of page, NOT fixed) */}
      <div className="w-full flex justify-center mt-4 mb-8">
        <button onClick={handleAskQuestion} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold px-12 py-4 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
          Ask Question
        </button>
      </div>

    </div>
  );
};

export default TeacherPg;
