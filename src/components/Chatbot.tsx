
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
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

// Helper function to simulate an AI response
const simulateAIResponse = (userMessage) => {
  // Create responses for general questions
  const generalResponses = [
    `That's an interesting question about "${userMessage}". While I don't have specific data on this exact topic, I can tell you that this relates to various factors worth considering. Can you provide more details about what you'd like to know?`,
    `Thanks for asking about "${userMessage}". This is a fascinating area with ongoing developments. From what I understand, there are multiple perspectives on this topic. Is there a specific aspect you're most interested in?`,
    `Your question about "${userMessage}" touches on important concepts. While I don't have comprehensive information on this specific query, I'd be happy to discuss what I do know or guide you to resources that might help.`,
    `Regarding "${userMessage}", there are several approaches to consider. The best answer often depends on your specific context and goals. Could you share more about your situation?`,
    `I understand you're asking about "${userMessage}". This is an evolving field with new research emerging regularly. While I can provide some general insights, specific details might require specialized knowledge.`
  ];
  
  // For demo purposes, we'll return a random general response
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
};

export function Chatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

      // Since we're simulating the API call, let's just use our simulation function
      // In a real implementation, you would uncomment and use the API call below
      /*
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

      if (!response.ok) {
        throw new Error("Failed to get response from AI service");
      }

      const data = await response.json();
      return data.response;
      */
      
      // For now, use our simulation function instead of the actual API call
      return simulateAIResponse(userMessage);
      
    } catch (error) {
      console.error("Error in AI response:", error);
      // Provide a graceful fallback response
      return "I apologize for the inconvenience. I'm currently having trouble processing your request. Please try asking another question or check back later.";
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = input.trim();
    setMessages((m) => [
      ...m,
      { from: "user", text: userMessage },
    ]);
    
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
      // Focus back on the input after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    // Scroll to bottom whenever messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Adjust textarea height as user types
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setInput(textarea.value);
    
    // Reset height to auto to calculate the new height
    textarea.style.height = 'auto';
    
    // Set the new height based on scrollHeight (plus a small buffer)
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter key (without Shift)
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

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
        <Textarea
          ref={inputRef}
          value={input}
          onChange={handleTextareaInput}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Type your message..."
          className="flex-1 min-h-[40px] max-h-[150px] resize-none"
          style={{ height: 'auto' }}
        />
        <Button type="submit" disabled={loading || !input.trim()} className="self-end">
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
