
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { useForm } from "react-hook-form";
import { Thermometer, Droplet, Leaf, Beaker } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
  const form = useForm<FertilizerFormData>();

  const onSubmit = async (data: FertilizerFormData) => {
    // Here we'll integrate with Supabase Edge Function later
    console.log("Form submitted:", data);
    setResult("Processing your fertilizer prediction...");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Beaker className="h-6 w-6 text-blue-600" />
          Fertilizer Prediction Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nitrogen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nitrogen</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Nitrogen" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phosphorus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phosphorus</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Phosphorus" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="potassium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Potassium</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Potassium" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="moisture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Droplet className="h-4 w-4" />
                      Moisture (%)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Moisture" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="soilType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      Crop Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">Predict Best Fertilizer</Button>
          </form>
        </Form>

        {result && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800 font-medium">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
