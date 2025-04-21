
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const initialMessages = [
  {
    from: "bot",
    text: "Hello! 👋 I'm your 24/7 Eco Crop Advisor assistant. How can I help you today?",
  },
];

export function Chatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const simulateAIResponse = async (msg: string) => {
    setLoading(true);
    // Simulate AI + websearch response (you could integrate with a real API later)
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(
          "Thank you for reaching out! Our support is always available. " +
          "Here’s some general advice: For specific crop or climate questions, mention your region. For urgent issues, we'll respond promptly!"
        );
      }, 1200);
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { from: "user", text: input.trim() },
    ]);
    setInput("");
    const response = await simulateAIResponse(input.trim());
    setMessages((m) => [
      ...m,
      { from: "user", text: input.trim() },
      { from: "bot", text: response },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg border p-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="text-green-600 dark:text-green-400" />
        <h3 className="font-semibold text-lg">24/7 Customer Support</h3>
      </div>
      <div className="h-56 overflow-y-auto mb-3 bg-gray-50 dark:bg-gray-800 rounded p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.from === "bot"
                  ? "bg-green-100 dark:bg-green-800/40 text-green-900 dark:text-green-100"
                  : "bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-2">
            <div className="animate-pulse bg-green-100 dark:bg-green-800/70 text-green-900 dark:text-green-100 px-3 py-2 rounded-lg text-sm">
              Typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <Input
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
