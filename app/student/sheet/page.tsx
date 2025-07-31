// student/sheet/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import StudentWaiting from '@/components/student/StudentWaiting';
import StudentResponse from '@/components/student/StudentResponse';
import { socket } from '@/lib/socket';

export default function SheetPage() {
  const [questionAvailable, setQuestionAvailable] = useState(false);

  useEffect(() => {
    const handleNewQuestion = (data: any) => {
      console.log('📢 Question received in SheetPage:', data);
      setQuestionAvailable(true);
    };

    // Connect socket if not connected
    if (!socket.connected) {
      socket.connect();
    }

    // Listen for new question
    socket.on('new-question', handleNewQuestion);

    return () => {
      socket.off('new-question', handleNewQuestion);
    };
  }, []);

  return (
    <div>
      {questionAvailable ? <StudentResponse /> : <StudentWaiting />}
    </div>
  );
}
