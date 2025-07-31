'use client';
import React, { useEffect, useState } from 'react';
import TeachersQuestion from '@/components/teacher/TeachersQuestion';
import { socket } from '@/lib/socket'; // Use centralized socket instead

const ResultsPage = () => {
  type PollOption = {
    text: string;
    percentage: number;
    selected: boolean; // assuming `TeachersQuestion` expects this
  };

  type PollData = {
    question: string;
    options: PollOption[];
  };

  const [pollResults, setPollResults] = useState<PollData | null>(null);

  useEffect(() => {
    // Ensure socket is connected
    if (!socket.connected) {
      socket.connect();
    }

    socket.on('poll-results', (data: PollData) => {
      setPollResults(data); // contains question, options, percentages
    });

    return () => {
      socket.off('poll-results');
    };
  }, []);

  return (
    <>
      {pollResults ? (
        <TeachersQuestion question={pollResults.question} options={pollResults.options} />
      ) : (
        <div className="p-10 text-center">Waiting for poll results...</div>
      )}
    </>
  );
};

export default ResultsPage;
