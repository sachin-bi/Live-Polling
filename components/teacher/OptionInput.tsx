'use client';
import React from 'react';

interface OptionInputProps {
  index: number;
  value: string;
  onChange: (value: string) => void;
  isCorrect: boolean;
  onCorrectChange: (correct: boolean) => void;
}

const OptionInput: React.FC<OptionInputProps> = ({
  index,
  value,
  onChange,
  isCorrect,
  onCorrectChange,
}) => {
  return (
    <>
      {/* Option Input */}
      <div>
        <div className="flex items-center gap-3 mt-6 md:mt-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-bold text-sm">
            {index + 1}
          </span>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="flex-1 p-3 border border-gray-300 rounded-xl shadow-sm
                       focus:ring-purple-500 focus:border-purple-500
                       bg-gray-100 text-gray-900 placeholder-gray-500 text-base"
          />
        </div>
      </div>

      {/* Is It Correct */}
      <div className="flex flex-col justify-end m-2 ml-12 mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Is It Correct?
        </label>
        <div className="flex items-center gap-6">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-purple-600"
              name={`correct-${index}`}
              checked={isCorrect}
              onChange={() => onCorrectChange(true)}
            />
            <span className="ml-2 text-gray-700">Yes</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-purple-600"
              name={`correct-${index}`}
              checked={!isCorrect}
              onChange={() => onCorrectChange(false)}
            />
            <span className="ml-2 text-gray-700">No</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default OptionInput;
