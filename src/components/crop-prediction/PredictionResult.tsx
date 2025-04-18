
import { Check } from "lucide-react";

interface PredictionResultProps {
  result: string;
}

export const PredictionResult = ({ result }: PredictionResultProps) => {
  if (!result) return null;

  return (
    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-lg animate-fade-in">
      <div className="flex items-start gap-2">
        <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
        <div>
          <h4 className="font-medium text-green-800 dark:text-green-400 mb-1">Recommendation:</h4>
          <p className="text-gray-700 dark:text-gray-300">{result}</p>
        </div>
      </div>
    </div>
  );
};
