"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    if (data.reply) {
      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col border">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t-lg">
            <h2 className="font-bold">AI Finance Bot</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`my-2 ${msg.role === "user" ? "text-blue-600 text-right" : "text-green-600 text-left"}`}>
                <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about expenses, SIPs..."
              className="flex-1 p-2 border rounded text-sm"
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-3 py-2 bg-blue-600 text-white rounded"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
