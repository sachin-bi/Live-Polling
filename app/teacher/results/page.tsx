'use client';
import React, { useEffect, useState } from 'react';
import TeachersQuestion from '@/components/teacher/TeachersQuestion';
import { socket } from '@/lib/socket'; // Use centralized socket instead

const ResultsPage = () => {
  const [pollResults, setPollResults] = useState<any>(null);

  useEffect(() => {
    // Ensure socket is connected
    if (!socket.connected) {
      socket.connect();
    }

    socket.on('poll-results', (data) => {
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
