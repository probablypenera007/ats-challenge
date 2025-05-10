"use client";

import React from "react";

interface ChatBoxProps {
  messages: { sender: "ai" | "user"; text: string }[];
  onSend: (message: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSend }) => {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="w-full max-w-2xl p-4 border rounded shadow bg-white">
      <div className="h-64 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded text-black ${
              msg.sender === "ai" ? "bg-purple-100 text-left" : "bg-blue-100 text-right"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response..."
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;