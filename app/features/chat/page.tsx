"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const userMessage = input;
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      {/* Floating background decoration */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-20 animate-pulse" />

      {/* Chat Widget */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-green-100 flex flex-col"
      >
        {/* Header */}
        <header className="p-5 bg-gradient-to-r from-green-600 to-green-500 text-white text-center shadow">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" /> Vera AI
          </h1>
          <p className="text-sm opacity-90">
            Your eco-friendly sustainability assistant 🌱
          </p>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 h-[500px]">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 mt-20"
            >
              🌍 Start chatting with Vera AI about sustainability!
            </motion.div>
          )}
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-green-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-green-100 text-gray-600 px-4 py-2 rounded-2xl rounded-bl-none shadow inline-flex gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-3 bg-gray-50 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your eco question..."
            className="flex-1 border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white/80"
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-md transition"
          >
            <Send size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
