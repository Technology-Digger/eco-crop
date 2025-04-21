
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

// Knowledge base for common agricultural questions
const knowledgeBase = [
  {
    keywords: ["fertilizer", "recommendation", "suggest", "which"],
    response: "For fertilizer recommendations, consider your soil type, crop needs, and current nutrient levels. Our Fertilizer Prediction tool can provide personalized recommendations based on your specific situation. Would you like me to guide you through using that tool?"
  },
  {
    keywords: ["crop", "recommendation", "suggest", "which", "plant", "grow"],
    response: "The best crops to grow depend on your local climate, soil quality, and market demand. Our Crop Prediction tool analyzes these factors to suggest optimal crops for your conditions. Would you like to try that tool?"
  },
  {
    keywords: ["soil", "health", "quality", "improve", "test", "fertility"],
    response: "Healthy soil is crucial for successful farming. Regular soil testing helps monitor nutrient levels. To improve soil health, consider crop rotation, cover crops, composting, and balanced fertilization. Our Soil Health section provides detailed guidance on this topic."
  },
  {
    keywords: ["pest", "disease", "control", "insect", "fungus", "treatment"],
    response: "For pest and disease management, we recommend integrated pest management (IPM) practices. This includes crop rotation, beneficial insects, resistant varieties, and targeted biological or chemical controls when necessary. Early detection is key to effective control."
  },
  {
    keywords: ["water", "irrigation", "drought", "moisture", "rain", "conserve"],
    response: "Water management is essential for crop success. Efficient irrigation methods include drip systems, moisture sensors, and timing irrigation based on crop needs. Water conservation practices such as mulching and proper scheduling can reduce water usage while maintaining yields."
  },
  {
    keywords: ["sustainable", "organic", "environment", "practice", "eco-friendly", "green"],
    response: "Sustainable farming practices include crop rotation, cover crops, reduced tillage, integrated pest management, and efficient resource use. These approaches help maintain soil health, reduce environmental impact, and can improve long-term farm productivity."
  },
  {
    keywords: ["climate", "weather", "season", "temperature", "rainfall", "forecast"],
    response: "Climate considerations are crucial for farming success. Our platform provides regional climate data and forecasting tools to help you plan planting, irrigation, and harvesting. The Seasonal Crops section offers guidance on optimal timing based on climate patterns."
  },
  {
    keywords: ["help", "how to", "guide", "tutorial", "explain", "instructions"],
    response: "I'm happy to help guide you through using any of our tools! Just let me know which feature you'd like assistance with, such as crop prediction, fertilizer recommendations, or soil health analysis, and I'll provide step-by-step instructions."
  }
];

export function Chatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const findRelevantResponse = (question: string) => {
    // Convert input to lowercase for case-insensitive matching
    const lowercaseQuestion = question.toLowerCase();
    
    // Find the knowledge base entry with the most keyword matches
    let bestMatch = { entry: null, matchCount: 0 };
    
    knowledgeBase.forEach(entry => {
      const matches = entry.keywords.filter(keyword => 
        lowercaseQuestion.includes(keyword.toLowerCase())
      ).length;
      
      if (matches > bestMatch.matchCount) {
        bestMatch = { entry, matchCount: matches };
      }
    });
    
    // If we found a good match (at least one keyword), return its response
    if (bestMatch.matchCount > 0 && bestMatch.entry) {
      return bestMatch.entry.response;
    }
    
    // Generic response for no matches
    return "I don't have specific information about that topic yet. For the most accurate assistance, please try our Crop Prediction or Fertilizer Recommendation tools, or browse our knowledge sections on Soil Health and Sustainable Farming. Is there something else I can help with?";
  };

  const simulateAIResponse = async (msg: string) => {
    setLoading(true);
    
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const response = findRelevantResponse(msg);
        resolve(response);
      }, 1200);
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages((m) => [
      ...m,
      { from: "user", text: input.trim() },
    ]);
    
    const userMessage = input.trim();
    setInput("");
    
    // Get AI response
    const response = await simulateAIResponse(userMessage);
    
    setMessages((m) => [
      ...m,
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
