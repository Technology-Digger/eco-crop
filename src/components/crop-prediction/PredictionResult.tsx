
import { Check, Award, ThumbsUp } from "lucide-react";

interface PredictionResultProps {
  result: string;
  alternativeOptions?: string[];
}

export const PredictionResult = ({ result, alternativeOptions = [] }: PredictionResultProps) => {
  if (!result) return null;

  return (
    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-lg animate-fade-in">
      <div className="flex items-start gap-2">
        <Award className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
        <div>
          <h4 className="font-medium text-green-800 dark:text-green-400 mb-1">Primary Recommendation:</h4>
          <p className="text-gray-700 dark:text-gray-300">{result}</p>
          
          {alternativeOptions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800/50">
              <h5 className="font-medium text-green-700 dark:text-green-500 text-sm mb-2 flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1.5" />
                Alternative Crop Options:
              </h5>
              <ul className="space-y-1">
                {alternativeOptions.map((option, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="h-3.5 w-3.5 text-green-500 dark:text-green-400 mr-1.5" />
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
