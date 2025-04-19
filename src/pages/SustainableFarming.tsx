
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Leaf, Recycle, Wind, Trees } from "lucide-react";
import { Link } from "react-router-dom";

const SustainableFarming = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 text-green-700 hover:text-green-800 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        
        <div className="bg-white dark:bg-gray-900/50 rounded-xl border dark:border-gray-800 shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Sustainable Farming Practices
          </h1>
          
          <div className="grid gap-8 mt-8">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9" 
                alt="Sustainable Farming" 
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Recycle className="h-6 w-6 text-green-600" />
                  <h2 className="text-xl font-semibold text-green-800 dark:text-green-400">Crop Rotation</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Rotate crops to maintain soil fertility and break pest cycles.
                  Plan 3-4 year rotation cycles for best results.
                </p>
              </div>
              
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg border border-emerald-200 dark:border-emerald-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Trees className="h-6 w-6 text-emerald-600" />
                  <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400">Agroforestry</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Integrate trees with crops and livestock.
                  Creates biodiversity and provides natural windbreaks.
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Wind className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-400">Conservation</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Minimal tillage and soil conservation practices.
                  Reduces erosion and maintains soil structure.
                </p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="h-6 w-6 text-amber-600" />
                  <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-400">Natural Pest Control</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Use beneficial insects and companion planting.
                  Reduces need for chemical pesticides.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SustainableFarming;
