
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { Thermometer, Droplet, Leaf, Beaker, Check, Zap, FlaskConical, Plant, PlaneTakeoff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "@/hooks/use-toast";

interface FertilizerFormData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  soilType: string;
  cropType: string;
  moisture: number;
}

// Sample fertilizer recommendations database
const fertilizerRecommendations = {
  rice: {
    clay: { npk: "18-46-0", application: "25-30 kg/ha", advice: "Split application recommended" },
    sandy: { npk: "16-20-0", application: "35-40 kg/ha", advice: "Add organic matter to improve soil structure" },
    loamy: { npk: "14-35-14", application: "25-30 kg/ha", advice: "Ideal soil type for rice cultivation" },
    black: { npk: "17-17-17", application: "20-25 kg/ha", advice: "Monitor iron levels closely" },
    red: { npk: "20-20-0", application: "30-35 kg/ha", advice: "Add zinc supplements for better yields" }
  },
  wheat: {
    clay: { npk: "20-20-0", application: "30-35 kg/ha", advice: "Apply before sowing" },
    sandy: { npk: "15-15-15", application: "40-45 kg/ha", advice: "Frequent but smaller applications recommended" },
    loamy: { npk: "12-32-16", application: "25-30 kg/ha", advice: "Optimal soil conditions" },
    black: { npk: "18-46-0", application: "20-25 kg/ha", advice: "Add potassium separately if needed" },
    red: { npk: "16-20-0", application: "30-35 kg/ha", advice: "Supplement with micronutrients" }
  },
  maize: {
    clay: { npk: "14-35-14", application: "30-35 kg/ha", advice: "Avoid waterlogging" },
    sandy: { npk: "20-10-10", application: "45-50 kg/ha", advice: "Frequent irrigation needed" },
    loamy: { npk: "15-15-15", application: "25-30 kg/ha", advice: "Ideal soil type for maize" },
    black: { npk: "12-32-16", application: "30-35 kg/ha", advice: "Good choice for black soils" },
    red: { npk: "14-35-14", application: "35-40 kg/ha", advice: "Add zinc supplements" }
  },
  cotton: {
    clay: { npk: "20-10-10", application: "25-30 kg/ha", advice: "Ensure good drainage" },
    sandy: { npk: "17-17-17", application: "35-40 kg/ha", advice: "Higher potassium may be beneficial" },
    loamy: { npk: "14-35-14", application: "20-25 kg/ha", advice: "Apply in split doses" },
    black: { npk: "16-20-0", application: "25-30 kg/ha", advice: "Particularly suited for cotton" },
    red: { npk: "12-32-16", application: "30-35 kg/ha", advice: "Monitor pH levels" }
  },
  sugarcane: {
    clay: { npk: "15-15-15", application: "40-45 kg/ha", advice: "Ensure good drainage systems" },
    sandy: { npk: "14-35-14", application: "50-55 kg/ha", advice: "Increase organic matter" },
    loamy: { npk: "20-10-10", application: "35-40 kg/ha", advice: "Optimal growth conditions" },
    black: { npk: "17-17-17", application: "30-35 kg/ha", advice: "Good water retention" },
    red: { npk: "18-46-0", application: "40-45 kg/ha", advice: "Add potassium separately" }
  }
};

export const FertilizerPredictionForm = () => {
  const [result, setResult] = useState<string>("");
  const [detailedAdvice, setDetailedAdvice] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  const form = useForm<FertilizerFormData>({
    defaultValues: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      moisture: 0,
      soilType: "",
      cropType: ""
    }
  });

  const onSubmit = async (data: FertilizerFormData) => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // Get recommendation from our "database"
        const cropType = data.cropType as keyof typeof fertilizerRecommendations;
        const soilType = data.soilType as keyof typeof fertilizerRecommendations[keyof typeof fertilizerRecommendations];
        
        let recommendation: string;
        let advice: string = "";
        
        // Check if we have a specific recommendation for this crop and soil type
        if (fertilizerRecommendations[cropType] && fertilizerRecommendations[cropType][soilType]) {
          const rec = fertilizerRecommendations[cropType][soilType];
          recommendation = `Based on your soil conditions and crop type (${cropType} in ${soilType} soil), we recommend using a ${rec.npk} NPK fertilizer at ${rec.application}.`;
          advice = rec.advice;
          
          // Add custom advice based on nutrient levels
          if (data.nitrogen < 30) {
            advice += " Consider additional nitrogen supplementation for better growth.";
          } else if (data.nitrogen > 100) {
            advice += " Reduce nitrogen application to prevent excessive vegetative growth.";
          }
          
          if (data.moisture < 30) {
            advice += " Increase irrigation frequency due to low soil moisture.";
          } else if (data.moisture > 80) {
            advice += " Improve drainage to prevent root diseases.";
          }
        } else {
          // Fallback recommendation based on nutrient levels
          const totalNutrients = data.nitrogen + data.phosphorus + data.potassium;
          
          if (totalNutrients < 50) {
            recommendation = `Based on your very low nutrient levels, we recommend a balanced 20-20-20 NPK fertilizer at 40 kg/ha.`;
          } else if (totalNutrients < 120) {
            recommendation = `Based on your moderate nutrient levels, we recommend a 15-15-15 NPK fertilizer at 25-30 kg/ha.`;
          } else {
            recommendation = `Based on your high nutrient levels, we recommend a specialized 10-20-30 NPK fertilizer at 15-20 kg/ha with focus on micronutrients.`;
          }
          
          advice = "Consider soil testing for more specific recommendations.";
        }
        
        setResult(recommendation);
        setDetailedAdvice(advice);
        setLoading(false);
        
        toast({
          title: "Analysis Complete",
          description: "Your fertilizer recommendation has been generated!",
          variant: "default",
        });
      } catch (error) {
        console.error("Error generating fertilizer recommendation:", error);
        setResult("Unable to generate recommendation. Please ensure all fields are filled correctly.");
        setLoading(false);
        
        toast({
          title: "Error",
          description: "Failed to generate recommendation. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <Card className="border-blue-100 dark:border-blue-900/50 shadow-md dark:bg-gray-900/50">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100 dark:border-blue-900/50">
        <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-400">
          <Beaker className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Fertilizer Prediction Form
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50">
                  <h3 className="text-md font-medium text-blue-800 dark:text-blue-400 mb-2 flex items-center">
                    <FlaskConical className="h-4 w-4 mr-2" />
                    Soil Nutrients
                  </h3>
                  <FormField
                    control={form.control}
                    name="nitrogen"
                    render={({ field }) => (
                      <FormItem className="mb-3">
                        <FormLabel className="text-gray-700 dark:text-gray-300">Nitrogen (N)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter Nitrogen" {...field} className="border-blue-200 dark:border-blue-900/50 focus-visible:ring-blue-500" />
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
                          <Input type="number" placeholder="Enter Phosphorus" {...field} className="border-blue-200 dark:border-blue-900/50 focus-visible:ring-blue-500" />
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
                          <Input type="number" placeholder="Enter Potassium" {...field} className="border-blue-200 dark:border-blue-900/50 focus-visible:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="moisture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Droplet className="h-4 w-4" />
                        Moisture (%)
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter Moisture" {...field} className="border-blue-200 dark:border-blue-900/50 focus-visible:ring-blue-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-900/50">
                  <h3 className="text-md font-medium text-purple-800 dark:text-purple-400 mb-2 flex items-center">
                    <Plant className="h-4 w-4 mr-2" />
                    Crop Information
                  </h3>
                  <FormField
                    control={form.control}
                    name="soilType"
                    render={({ field }) => (
                      <FormItem className="mb-3">
                        <FormLabel className="text-gray-700 dark:text-gray-300">Soil Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-purple-200 dark:border-purple-900/50 focus-visible:ring-purple-500">
                              <SelectValue placeholder="Select soil type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="clay">Clay</SelectItem>
                            <SelectItem value="sandy">Sandy</SelectItem>
                            <SelectItem value="loamy">Loamy</SelectItem>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cropType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Leaf className="h-4 w-4" />
                          Crop Type
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-purple-200 dark:border-purple-900/50 focus-visible:ring-purple-500">
                              <SelectValue placeholder="Select crop type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="maize">Maize</SelectItem>
                            <SelectItem value="cotton">Cotton</SelectItem>
                            <SelectItem value="sugarcane">Sugarcane</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full border-indigo-200 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 flex items-center gap-2"
                  onClick={() => {
                    toast({
                      title: "Location Detected",
                      description: "Automatically filled climate data based on your location",
                    });
                    // Simulate filling data based on geolocation
                    form.setValue("moisture", 45);
                  }}
                >
                  <PlaneTakeoff className="h-4 w-4" />
                  Detect Location & Fill Climate Data
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-pulse">Processing</span>
                  <Zap className="ml-2 h-4 w-4 animate-pulse" />
                </>
              ) : (
                <>
                  Predict Best Fertilizer
                  <Beaker className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg animate-fade-in">
            <div className="flex items-start gap-2">
              <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-1">Recommendation:</h4>
                <p className="text-gray-700 dark:text-gray-300">{result}</p>
                
                {detailedAdvice && (
                  <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800/50">
                    <h5 className="font-medium text-blue-700 dark:text-blue-500 text-sm mb-1">Additional Advice:</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{detailedAdvice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
