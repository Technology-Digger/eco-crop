import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Leaf } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { SoilNutrientsForm } from "./crop-prediction/SoilNutrientsForm";
import { ClimateConditionsForm } from "./crop-prediction/ClimateConditionsForm";
import { PredictionResult } from "./crop-prediction/PredictionResult";
import { CropFormData } from "./crop-prediction/types";

// Sample crop prediction database
const cropDatabase = [
  { crop: "Rice", nitrogen: 60, phosphorus: 40, potassium: 40, temperature: 23, humidity: 80, ph: 6.5, rainfall: 200 },
  { crop: "Wheat", nitrogen: 40, phosphorus: 60, potassium: 30, temperature: 20, humidity: 60, ph: 7.0, rainfall: 100 },
  { crop: "Maize", nitrogen: 40, phosphorus: 30, potassium: 40, temperature: 22, humidity: 50, ph: 6.8, rainfall: 80 },
  { crop: "Cotton", nitrogen: 80, phosphorus: 30, potassium: 70, temperature: 25, humidity: 55, ph: 6.5, rainfall: 70 },
  { crop: "Sugarcane", nitrogen: 90, phosphorus: 45, potassium: 80, temperature: 28, humidity: 70, ph: 6.3, rainfall: 150 },
  { crop: "Barley", nitrogen: 35, phosphorus: 30, potassium: 25, temperature: 18, humidity: 45, ph: 6.8, rainfall: 60 },
  { crop: "Sorghum", nitrogen: 30, phosphorus: 25, potassium: 40, temperature: 26, humidity: 40, ph: 5.8, rainfall: 55 },
  { crop: "Soybean", nitrogen: 20, phosphorus: 35, potassium: 45, temperature: 23, humidity: 65, ph: 6.5, rainfall: 90 },
  { crop: "Oats", nitrogen: 25, phosphorus: 30, potassium: 30, temperature: 17, humidity: 60, ph: 6.0, rainfall: 85 },
  { crop: "Sunflower", nitrogen: 45, phosphorus: 50, potassium: 35, temperature: 24, humidity: 45, ph: 6.5, rainfall: 60 }
];

export const CropPredictionForm = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  
  const form = useForm<CropFormData>({
    defaultValues: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      temperature: 0,
      humidity: 0,
      ph: 0,
      rainfall: 0
    }
  });

  useEffect(() => {
    const handleClimateData = (event: CustomEvent<{ temperature: number; humidity: number; rainfall: number }>) => {
      form.setValue('temperature', event.detail.temperature);
      form.setValue('humidity', event.detail.humidity);
      form.setValue('rainfall', event.detail.rainfall);
    };

    window.addEventListener('climate-data-update', handleClimateData as EventListener);
    return () => {
      window.removeEventListener('climate-data-update', handleClimateData as EventListener);
    };
  }, [form]);

  // Function to find similarity between input parameters and crop requirements
  const calculateSimilarity = (input: CropFormData, crop: typeof cropDatabase[0]): number => {
    // Calculate Euclidean distance between input and crop data points (simplified)
    const nitrogenDiff = Math.abs(input.nitrogen - crop.nitrogen) / 100;
    const phosphorusDiff = Math.abs(input.phosphorus - crop.phosphorus) / 100;
    const potassiumDiff = Math.abs(input.potassium - crop.potassium) / 100;
    const temperatureDiff = Math.abs(input.temperature - crop.temperature) / 30;
    const humidityDiff = Math.abs(input.humidity - crop.humidity) / 100;
    const phDiff = Math.abs(input.ph - crop.ph) / 14;
    const rainfallDiff = Math.abs(input.rainfall - crop.rainfall) / 300;
    
    // Calculate weighted sum of differences
    const totalDiff = 
      nitrogenDiff * 0.2 + 
      phosphorusDiff * 0.15 + 
      potassiumDiff * 0.15 + 
      temperatureDiff * 0.15 + 
      humidityDiff * 0.1 + 
      phDiff * 0.15 + 
      rainfallDiff * 0.1;
    
    // Convert to similarity score (1 is perfect match, 0 is completely different)
    return 1 - totalDiff;
  };

  const onSubmit = async (data: CropFormData) => {
    setLoading(true);
    setRecommendations([]);
    
    // Simulate API call delay
    setTimeout(() => {
      // Calculate similarity scores for all crops
      const cropScores = cropDatabase.map(crop => ({
        crop: crop.crop,
        score: calculateSimilarity(data, crop)
      }));
      
      // Sort by similarity score (highest first)
      cropScores.sort((a, b) => b.score - a.score);
      
      // Get top 3 recommendations
      const topRecommendations = cropScores.slice(0, 3);
      
      // Format the results
      const mainRecommendation = topRecommendations[0].crop;
      const otherRecommendations = topRecommendations.slice(1).map(r => r.crop);
      
      setResult(`Based on your soil and climate parameters, we recommend planting ${mainRecommendation}.`);
      setRecommendations(otherRecommendations);
      setLoading(false);
      
      // Show success notification
      toast({
        title: "Prediction Complete",
        description: `Primary recommendation: ${mainRecommendation}`,
        variant: "default",
      });
    }, 1500); // Simulate network delay
  };

  return (
    <Card className="border-green-100 dark:border-green-900/50 shadow-md dark:bg-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-b border-green-100 dark:border-green-900/50">
        <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
          <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
          Crop Prediction Form
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <SoilNutrientsForm form={form} />
                
                <FormField
                  control={form.control}
                  name="ph"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Soil pH</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter pH" 
                          {...field} 
                          className="border-amber-200 dark:border-amber-900/50 focus-visible:ring-amber-500" 
                          step="0.1"
                          min="0"
                          max="14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <ClimateConditionsForm form={form} />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 mt-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-pulse">Processing</span>
                  <Leaf className="ml-2 h-4 w-4 animate-pulse" />
                </>
              ) : (
                <>
                  Predict Best Crop
                  <Leaf className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>

        <PredictionResult result={result} alternativeOptions={recommendations} />
      </CardContent>
    </Card>
  );
};

export default CropPredictionForm;
