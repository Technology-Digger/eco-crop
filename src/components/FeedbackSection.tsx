
import React, { useState } from "react";
import { Star, StarOff } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "@/hooks/use-toast";

export function FeedbackSection() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate your input to improve Eco Crop Advisor.",
    });
    setTimeout(() => setSubmitted(false), 4000);
    setRating(0);
    setHover(null);
    setFeedback("");
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg border p-4 animate-fade-in">
      <h3 className="font-semibold text-lg mb-2">Rate & Feedback</h3>
      <form onSubmit={submitFeedback}>
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((idx) => (
            <button
              type="button"
              key={idx}
              disabled={submitted}
              className="group"
              onClick={() => setRating(idx)}
              onMouseEnter={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
            >
              { (hover ?? rating) >= idx ? (
                <Star className="text-yellow-500 fill-yellow-400 size-6 transition-colors" />
              ) : (
                <StarOff className="text-gray-300 size-6 transition-colors" />
              )}
            </button>
          ))}
        </div>
        <Textarea
          className="mb-2"
          placeholder="Share your experience or suggestions..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          disabled={submitted}
        />
        <Button disabled={submitted || !feedback.trim() || rating === 0} type="submit" className="w-full">
          {submitted ? "Submitted!" : "Submit Feedback"}
        </Button>
      </form>
    </div>
  );
}
