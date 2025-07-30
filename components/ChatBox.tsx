// ChatBox.tsx
import React, { useState } from 'react';

const ChatBox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'participants'>('chat');
  const [newMessage, setNewMessage] = useState<string>('');

  // Dummy data for demonstration
  const messages = [
    { id: 1, sender: 'User 1', text: 'Hey there, how can I help?' },
    { id: 2, sender: 'User 2', text: 'Nothing bro, just chill!!!' },
    // Add more messages here if needed for scrolling demonstration
    { id: 3, sender: 'User 1', text: 'Sounds good! Enjoy your day.' },
    { id: 4, sender: 'User 2', text: 'You too!' },
    { id: 5, sender: 'User 1', text: 'Just checking in, anything new?' },
    { id: 6, sender: 'User 2', text: 'Nah, same old. You?' },
    { id: 7, sender: 'User 1', text: 'Thinking about grabbing some coffee.' },
    { id: 8, sender: 'User 2', text: 'Good idea! I could use one too.' },
    { id: 9, sender: 'User 1', text: 'Alright, catch you later then.' },
    { id: 10, sender: 'User 2', text: 'Later!' },
  ];

  const participants = [
    { id: 1, name: 'Rahul Arora' },
    { id: 2, name: 'Pushpender Rautela' },
    { id: 3, name: 'Rijul Zalpuri' },
    { id: 4, name: 'Nadeem N' },
    { id: 5, name: 'Ashwin Sharma' },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you'd send this message to a backend/Firestore
      console.log('Sending message:', newMessage);
      setNewMessage('');
      // For demonstration, you might add it to the messages array:
      // setMessages([...messages, { id: Date.now(), sender: 'Me', text: newMessage }]);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 w-80 md:w-96 bg-white rounded-xl shadow-2xl flex flex-col h-[500px] overflow-hidden">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 text-lg font-semibold ${
            activeTab === 'chat'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          } transition-colors duration-200`}
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </button>
        <button
          className={`flex-1 py-3 text-lg font-semibold ${
            activeTab === 'participants'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          } transition-colors duration-200`}
          onClick={() => setActiveTab('participants')}
        >
          Participants
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'chat' ? (
          <div className="flex flex-col space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'User 1' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
                    msg.sender === 'User 1'
                      ? 'bg-gray-800 text-white rounded-bl-none'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none'
                  }`}
                >
                  <p className="font-semibold text-sm mb-1">
                    {msg.sender === 'User 1' ? 'User 1' : 'User 2'}
                  </p>
                  <p className="text-base">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 py-2 border-b border-gray-200 font-semibold text-gray-700">
              <span>Name</span>
              <span className="text-right">Action</span>
            </div>
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="grid grid-cols-2 gap-x-4 items-center py-3 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-gray-800">{participant.name}</span>
                <button className="text-purple-600 text-sm font-semibold text-right hover:underline">
                  Kick out
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Input (only in Chat tab) */}
      {activeTab === 'chat' && (
        <div className="p-4 border-t border-gray-200 flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="ml-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
