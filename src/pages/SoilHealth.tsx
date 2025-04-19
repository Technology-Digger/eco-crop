
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Droplet, Sprout, Zap, Microscope } from "lucide-react";
import { Link } from "react-router-dom";

const SoilHealth = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 text-blue-700 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        
        <div className="bg-white dark:bg-gray-900/50 rounded-xl border dark:border-gray-800 shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Soil Health Guide
          </h1>
          
          <div className="grid gap-8 mt-8">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
                alt="Healthy Soil" 
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg border border-emerald-200 dark:border-emerald-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Microscope className="h-6 w-6 text-emerald-600" />
                  <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400">Soil Testing</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Regular soil testing helps monitor nutrient levels (N-P-K), pH, and organic matter content.
                  Test annually for optimal results.
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Droplet className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-400">Water Management</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Proper drainage and irrigation are crucial for soil health.
                  Monitor moisture levels to prevent erosion and nutrient leaching.
                </p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Sprout className="h-6 w-6 text-amber-600" />
                  <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-400">Organic Matter</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Incorporate compost and cover crops to improve soil structure.
                  Aim for 3-5% organic matter content for optimal fertility.
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-6 w-6 text-purple-600" />
                  <h2 className="text-xl font-semibold text-purple-800 dark:text-purple-400">pH Balance</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Most crops thrive in soil pH between 6.0 and 7.0.
                  Adjust pH using lime (to raise) or sulfur (to lower).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SoilHealth;
