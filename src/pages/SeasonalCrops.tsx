
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sun, Cloud, Snowflake, Flower } from "lucide-react";
import { Link } from "react-router-dom";

const SeasonalCrops = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 text-amber-700 hover:text-amber-800 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        
        <div className="bg-white dark:bg-gray-900/50 rounded-xl border dark:border-gray-800 shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
            Seasonal Crops Guide
          </h1>
          
          <div className="grid gap-8 mt-8">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                alt="Spring Crops" 
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Sun className="h-6 w-6 text-amber-600" />
                  <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-400">Summer Crops</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Perfect for warm weather: Tomatoes, Peppers, Corn, Beans, Squash.
                  Plant when soil temperature reaches 60-70°F (15-21°C).
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Cloud className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-400">Spring Crops</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Early season favorites: Peas, Lettuce, Spinach, Carrots, Radishes.
                  Can tolerate light frost and cool soil temperatures.
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Flower className="h-6 w-6 text-purple-600" />
                  <h2 className="text-xl font-semibold text-purple-800 dark:text-purple-400">Fall Crops</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Hardy vegetables: Broccoli, Cauliflower, Brussels Sprouts, Kale.
                  Plant 6-8 weeks before first frost date.
                </p>
              </div>
              
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg border border-emerald-200 dark:border-emerald-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <Snowflake className="h-6 w-6 text-emerald-600" />
                  <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400">Winter Crops</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Cold-resistant varieties: Winter Wheat, Garlic, Onions.
                  Some can survive under snow cover and resume growth in spring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SeasonalCrops;
