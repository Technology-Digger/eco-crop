
import { useState } from "react";
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

export const CropPredictionForm = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
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

  const onSubmit = async (data: CropFormData) => {
    setLoading(true);
    
    // Sample prediction logic
    let recommendedCrop = "Unknown";
    
    // Basic sample prediction rules
    if (data.nitrogen > 50 && data.temperature > 20 && data.humidity > 60) {
      recommendedCrop = "Rice";
    } else if (data.phosphorus > 40 && data.rainfall > 100) {
      recommendedCrop = "Wheat";
    } else if (data.potassium > 30 && data.ph > 6 && data.ph < 7.5) {
      recommendedCrop = "Maize";
    } else {
      recommendedCrop = "Mixed Crops";
    }

    // Simulate a slight delay
    setTimeout(() => {
      setResult(`Based on your soil and climate parameters, we recommend planting ${recommendedCrop}.`);
      setLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: `Recommended crop: ${recommendedCrop}`,
        variant: "default",
      });
    }, 1000);
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

        <PredictionResult result={result} />
      </CardContent>
    </Card>
  );
};

export default CropPredictionForm;
