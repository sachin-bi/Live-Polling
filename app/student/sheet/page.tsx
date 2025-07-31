// student/sheet/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import StudentWaiting from '@/components/student/StudentWaiting';
import StudentResponse from '@/components/student/StudentResponse';
import { socket } from '@/lib/socket';

export default function SheetPage() {
  const [questionAvailable, setQuestionAvailable] = useState(false);

  useEffect(() => {

    type PollOption = {
      text: string;
      count: number;
      percentage: number;
    };

    type PollData = {
      question: string;
      options: PollOption[];
    };

    const handleNewQuestion = (data: PollData) => {
      console.log('📢 Question received in SheetPage:', data);
      setQuestionAvailable(true);
    };

    const handleConnect = () => {
      socket.emit('join-as-student');
      console.log('👨‍🎓 join-as-student emitted from /student/sheet');
    };

    // Setup listeners
    socket.on('connect', handleConnect);
    socket.on('new-question', handleNewQuestion);

    // Ensure connection
    if (!socket.connected) socket.connect();
    else handleConnect();

    return () => {
      socket.off('connect', handleConnect);
      socket.off('new-question', handleNewQuestion);
    };
  }, []);

  return (
    <div>
      {questionAvailable ? <StudentResponse /> : <StudentWaiting />}
    </div>
  );
}
