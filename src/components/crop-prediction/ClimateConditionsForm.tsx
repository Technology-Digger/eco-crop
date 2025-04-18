
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Cloud, Thermometer, Droplet } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CropFormData } from "./types";

interface ClimateConditionsFormProps {
  form: UseFormReturn<CropFormData>;
}

export const ClimateConditionsForm = ({ form }: ClimateConditionsFormProps) => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50">
      <h3 className="text-md font-medium text-blue-800 dark:text-blue-400 mb-2 flex items-center">
        <Cloud className="h-4 w-4 mr-2" />
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
  );
};
