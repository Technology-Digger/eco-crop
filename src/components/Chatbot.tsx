
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

const initialMessages = [
  {
    from: "bot",
    text: "Hello! 👋 I'm your 24/7 Eco Crop Advisor assistant. I can help with farming questions or any other topics you're curious about. How can I assist you today?",
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
  const [isOpen, setIsOpen] = useState(false);
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
    
    // For questions not in our knowledge base, we'll use a general AI response
    return null;
  };

  const fetchAIResponse = async (userMessage: string) => {
    try {
      // First check our knowledge base for farming-specific questions
      const knowledgeResponse = findRelevantResponse(userMessage);
      if (knowledgeResponse) {
        return knowledgeResponse;
      }

      // For general questions, we'll use an external AI service
      // This is a simulated call - in a real implementation, you would call an actual AI API
      const response = await fetch("https://api.example.com/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context: "eco-farming assistant",
        }),
      });

      // Simulate a delay and response when API is not available
      if (!response.ok) {
        // Simple simulation of a general response for demo purposes
        const generalResponses = [
          "That's an interesting question! While I specialize in agricultural topics, I can try to help with general information too. Based on my knowledge, " + userMessage.split(" ").slice(0, 3).join(" ") + " relates to various factors you might want to consider.",
          "I understand you're asking about " + userMessage.split(" ").slice(0, 4).join(" ") + ". While I focus on farming topics, this appears to be outside my primary expertise. I'd recommend consulting a specialized resource for the most accurate information.",
          "Great question! Though I'm primarily designed to help with agricultural topics, I can share that " + userMessage.split(" ").slice(0, 3).join(" ") + " is something many people are interested in learning more about.",
          "I appreciate your curiosity! While my specialty is farming and crops, your question about " + userMessage.split(" ").slice(0, 3).join(" ") + " touches on broader topics that have many perspectives.",
          "Thanks for asking! While I'm most knowledgeable about agricultural topics, I understand you're interested in " + userMessage.split(" ").slice(0, 4).join(" ") + ". This is a fascinating area with ongoing developments."
        ];
        
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "I'm having trouble connecting to my knowledge source right now. For the most accurate assistance with farming questions, please try our Crop Prediction or Fertilizer Recommendation tools. Is there a specific farming topic I can help with?";
    }
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
    setLoading(true);
    
    try {
      // Get AI response
      const response = await fetchAIResponse(userMessage);
      
      setMessages((m) => [
        ...m,
        { from: "bot", text: response },
      ]);
    } catch (error) {
      console.error("Error in chat:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const ChatContent = () => (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-4 animate-fade-in">
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
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  );

  return (
    <>
      {/* Mobile view: Drawer */}
      <div className="md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Chat with Assistant</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-4">
            <ChatContent />
          </DrawerContent>
        </Drawer>
      </div>
      
      {/* Desktop view: Direct component */}
      <div className="hidden md:block max-w-md">
        <ChatContent />
      </div>
    </>
  );
}
