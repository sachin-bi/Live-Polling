const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // or '*' for dev |'*', // Replace with your Vercel domain in production
        methods: ['GET', 'POST']
    }
});

let currentPoll = null;
let responseCount = 0;
let totalStudents = 0;

io.on('connection', (socket) => {
    console.log('🟢 New user:', socket.id);
    
    // 👉 Immediately send current poll to newly connected student
    if (currentPoll) {
        socket.emit('new-question', currentPoll);
    }

    let isStudent = false;
    socket.on('join-as-student', () => {
        isStudent = true;
        totalStudents++;
        console.log('👨‍🎓 Student joined. Total:', totalStudents);

        if (currentPoll) {
            socket.emit('new-question', currentPoll);
        }
    });


    socket.on('disconnect', () => {

        console.log('🔴 Disconnected:', socket.id);
        if (isStudent) {
            totalStudents--;
            console.log('🔴 Student left. Total:', totalStudents);
        }
    });

    socket.on('new-question', (data) => {
        currentPoll = {
            question: data.question,
            options: data.options.map(opt => ({
                text: opt.text,
                count: 0,
                percentage: 0,
            }))
        };
        responseCount = 0;

        io.emit('new-question', currentPoll);
    });

    socket.on('submit-response', (index) => {
        if (!currentPoll) return;

        currentPoll.options[index].count++;
        responseCount++;

        const totalVotes = responseCount;
        currentPoll.options = currentPoll.options.map(opt => ({
            ...opt,
            percentage: Math.round((opt.count / totalVotes) * 100),
        }));

        io.emit('poll-results', {
            question: currentPoll.question,
            options: currentPoll.options,
        });

        // ✅ Notify teacher when all students have responded
        if (responseCount >= totalStudents) {
            io.emit('poll-complete');
        }
    });
});


const PORT = 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
