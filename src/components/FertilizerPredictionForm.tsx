
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { Thermometer, Droplet, Leaf, Beaker, Check, Zap, FlaskConical } from "lucide-react";
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

export const FertilizerPredictionForm = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  const form = useForm<FertilizerFormData>({
    defaultValues: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      moisture: 40,
      soilType: "",
      cropType: ""
    }
  });

  const onSubmit = async (data: FertilizerFormData) => {
    setLoading(true);
    
    // Here we'll integrate with Supabase Edge Function later
    console.log("Form submitted:", data);
    
    // Simulate API call
    setTimeout(() => {
      setResult("Based on your soil conditions and crop type, we recommend using a 14-35-14 NPK fertilizer at 25 kg/ha.");
      setLoading(false);
      toast({
        title: "Analysis Complete",
        description: "Your fertilizer recommendation has been generated!",
        variant: "default",
      });
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
                    <Leaf className="h-4 w-4 mr-2" />
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
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
