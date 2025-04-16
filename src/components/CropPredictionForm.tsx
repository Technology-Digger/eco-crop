
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { useForm } from "react-hook-form";
import { Thermometer, Droplet, Leaf } from "lucide-react";

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
  const form = useForm<CropFormData>();

  const onSubmit = async (data: CropFormData) => {
    // Here we'll integrate with Supabase Edge Function later
    console.log("Form submitted:", data);
    setResult("Processing your crop prediction...");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-600" />
          Crop Prediction Form
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
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      Temperature (°C)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Temperature" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="humidity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Droplet className="h-4 w-4" />
                      Humidity (%)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Humidity" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ph"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>pH</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter pH" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rainfall"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Droplet className="h-4 w-4" />
                      Rainfall (mm)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Rainfall" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">Predict Best Crop</Button>
          </form>
        </Form>

        {result && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 font-medium">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
