
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { Thermometer, Droplet, Leaf, Zap, Check, Cloud as CloudIcon, CloudSun } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CropFormData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export const CropPredictionForm = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  const form = useForm<CropFormData>({
    defaultValues: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      temperature: 25,
      humidity: 60,
      ph: 0, // Changed from 6.5 to 0
      rainfall: 200
    }
  });

  const onSubmit = async (data: CropFormData) => {
    setLoading(true);
    
    // Here we'll integrate with Supabase Edge Function later
    console.log("Form submitted:", data);
    
    // Simulate API call
    setTimeout(() => {
      setResult("Based on your soil and climate parameters, we recommend planting Rice, Maize or Cotton.");
      setLoading(false);
      toast({
        title: "Analysis Complete",
        description: "Your crop prediction has been processed successfully!",
        variant: "default",
      });
    }, 1500);
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
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-900/50">
                  <h3 className="text-md font-medium text-green-800 dark:text-green-400 mb-2 flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Soil Nutrients
                  </h3>
                  <FormField
                    control={form.control}
                    name="nitrogen"
                    render={({ field }) => (
                      <FormItem className="mb-3">
                        <FormLabel className="text-gray-700 dark:text-gray-300">Nitrogen (N)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter Nitrogen" {...field} className="border-green-200 dark:border-green-900/50 focus-visible:ring-green-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phosphorus"
                    render={({ field }) => (
                      <FormItem className="mb-3">
                        <FormLabel className="text-gray-700 dark:text-gray-300">Phosphorus (P)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter Phosphorus" {...field} className="border-green-200 dark:border-green-900/50 focus-visible:ring-green-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="potassium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Potassium (K)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter Potassium" {...field} className="border-green-200 dark:border-green-900/50 focus-visible:ring-green-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
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
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50">
                  <h3 className="text-md font-medium text-blue-800 dark:text-blue-400 mb-2 flex items-center">
                    <CloudIcon className="h-4 w-4 mr-2" />
                    Climate Conditions
                  </h3>
                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <FormItem className="mb-3">
                        <FormLabel className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Thermometer className="h-4 w-4" />
                          Temperature (°C)
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter Temperature" {...field} className="border-blue-200 dark:border-blue-900/50 focus-visible:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="humidity"
                    render={({ field }) => (
                      <FormItem className="mb-3">
                        <FormLabel className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Droplet className="h-4 w-4" />
                          Humidity (%)
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter Humidity" {...field} className="border-blue-200 dark:border-blue-900/50 focus-visible:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rainfall"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Droplet className="h-4 w-4" />
                          Rainfall (mm)
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter Rainfall" {...field} className="border-blue-200 dark:border-blue-900/50 focus-visible:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                  <Zap className="ml-2 h-4 w-4 animate-pulse" />
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

        {result && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-lg animate-fade-in">
            <div className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-400 mb-1">Recommendation:</h4>
                <p className="text-gray-700 dark:text-gray-300">{result}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
