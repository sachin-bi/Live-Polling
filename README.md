🗳️ Live Polling App
====================

A real-time polling platform built using Next.js, TypeScript, and Socket.IO. This app allows teachers to conduct live polls during sessions, and students to join, submit responses, and view results—all in real time.

------------------------------------------------------------

🚀 Features
-----------
- 👨‍🏫 Teachers can send live questions
- 🧑‍🎓 Students can join polls with their name
- 📊 Real-time updates of answers and results using Socket.IO
- ⏳ Wait screen for students until the question is sent
- ✅ Tracks total students and submitted responses
- 📈 Instant results for both teacher and students

------------------------------------------------------------

🧱 Tech Stack
-------------
| Frontend           | Backend           | Real-Time        |
|--------------------|-------------------|------------------|
| Next.js (App Router) | Node.js + Express | Socket.IO         |
| TypeScript         | TypeScript        | WebSockets       |
| Tailwind CSS       | REST APIs         | Event-driven updates |

------------------------------------------------------------

📁 Project Structure
--------------------
├── frontend/ (Next.js + App Router)
│   ├── app/
│   │   ├── student/
│   │   │   ├── sheet/
│   │   │   └── waiting/
│   │   ├── teacher/
│   │   │   ├── results/
│   │   │   └── questions/
│   └── components/
│       ├── StudentResponse.tsx
│       ├── StudentWaiting.tsx
│       ├── TeachersQuestion.tsx
│       └── TeachersResult.tsx
├── backend/ (Express + Socket.IO)
│   └── index.ts

------------------------------------------------------------

⚙️ Installation
---------------
1. Clone the repo:
   git clone https://github.com/your-username/live-polling-app.git
   cd live-polling-app

2. Install dependencies:
   Frontend:
   cd frontend
   npm install

   Backend:
   cd ../backend
   npm install

------------------------------------------------------------

🧪 Running the App Locally
--------------------------
Backend (Socket.IO Server):
   cd backend
   npm run dev
   → Runs on http://localhost:4000

Frontend (Next.js):
   cd frontend
   npm run dev
   → Runs on http://localhost:3000

------------------------------------------------------------

🌐 Deployment
-------------
Frontend (Vercel):
- Deploy the frontend/ folder on Vercel
- Add NEXT_PUBLIC_SOCKET_URL=https://your-backend.onrender.com to your .env

Backend (Render.com):
- Deploy the backend/ folder on Render
- Expose port 4000

------------------------------------------------------------

🔗 Routes
---------
Students:
- /student/sheet – Join poll & submit answer
- /student/waiting – Wait until question appears

Teachers:
- /teacher/questions – Send question to students
- /teacher/results – View live results

------------------------------------------------------------

🛠️ Environment Variables
-------------------------
Frontend .env:
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000

Backend .env (optional):
PORT=4000

------------------------------------------------------------

📸 Screenshots
--------------
Coming soon...

------------------------------------------------------------

👨‍💻 Author
------------
Sachin Roy
- Portfolio: [sachin-portfolio-link]
- LinkedIn: linkedin.com/in/sachin
- GitHub: github.com/sachinroy-dev

------------------------------------------------------------