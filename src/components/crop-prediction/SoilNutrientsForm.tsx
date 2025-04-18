
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CropFormData } from "./types";

interface SoilNutrientsFormProps {
  form: UseFormReturn<CropFormData>;
}

export const SoilNutrientsForm = ({ form }: SoilNutrientsFormProps) => {
  return (
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
  );
};
