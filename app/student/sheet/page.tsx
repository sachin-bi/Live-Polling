// student/sheet/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import StudentWaiting from '@/components/student/StudentWaiting';
import StudentResponse from '@/components/student/StudentResponse';
import { socket } from '@/lib/socket';


export default function SheetPage() {
  const [questionAvailable, setQuestionAvailable] = useState(false);

  useEffect(() => {
    

    // Listen for a new question event
    socket.on('new-question', (data) => {
      console.log('Received question:', data); // logs??
      setQuestionAvailable(true);
    });

    //TODO Optional cleanup / is it ok?
    return () => {
      socket.off("new-question");
    };
  }, []);

  return (
    <div>
      {questionAvailable ? <StudentResponse /> : <StudentWaiting />}
    </div>
  );
}
