"use client";

import React, { useEffect, useRef, useState } from "react";

interface ChatBoxProps {
  messages: { sender: "ai" | "user"; text: string }[];
  onSend: (message: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSend }) => {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-2xl border border-gray-200">
      <div className="h-[28rem] overflow-y-auto space-y-4 mb-6 px-2 flex flex-col">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              // className={`inline-block px-5 py-3 rounded-2xl shadow-md text-base leading-relaxed break-words max-w-[80%] ${
                className={`inline-block px-6 py-4 rounded-2xl shadow-md text-lg md:text-xl font-medium leading-relaxed break-words max-w-[85%] ${
  
              msg.sender === "user"
                  ? "bg-indigo-100 text-gray-900"
                  : "bg-purple-100 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-end gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder="Type your response..."
          className="w-full resize-none px-5 py-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-xl text-gray-800"
          />
        <button
          onClick={handleSend}
          className="px-8 py-7 bg-purple-600 text-white text-xl font-semibold rounded-2xl hover:bg-purple-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;