
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Leaf, Beaker, MapPin, Info, TrendingUp, Cloud, DropletIcon, LineChart, Sprout, Wind } from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="grid gap-8">
      <div className="rounded-xl border bg-white dark:bg-gray-900/50 dark:border-gray-800 p-8 shadow-sm transition-colors duration-200">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Eco Crop Advisor
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Smart recommendations for sustainable farming. Get data-driven insights
            to maximize your yield while preserving the environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="overflow-hidden group border-2 border-green-100 dark:border-green-900/50 hover:border-green-300 dark:hover:border-green-800 transition-all duration-300 dark:bg-gray-800/50">
            <CardContent className="p-0">
              <Link to="/crop-prediction">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-8 h-full transition-colors duration-200">
                  <div className="mb-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg inline-block shadow-sm">
                    <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-green-800 dark:text-green-400">Crop Prediction</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">Identify the best crops to plant based on your soil composition and local climate conditions.</p>
                  <Button className="group-hover:bg-green-700 transition-colors">
                    Get Started
                    <TrendingUp className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden group border-2 border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-800 transition-all duration-300 dark:bg-gray-800/50">
            <CardContent className="p-0">
              <Link to="/fertilizer-prediction">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-8 h-full transition-colors duration-200">
                  <div className="mb-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg inline-block shadow-sm">
                    <Beaker className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-400">Fertilizer Prediction</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">Get personalized fertilizer recommendations based on your crop type and soil nutrient levels.</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700 transition-colors">
                    Get Started
                    <TrendingUp className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Info className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Agricultural Insights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 dark:from-amber-900/20 dark:to-amber-900/30 dark:border-amber-800/30 hover:shadow-md transition-all duration-300 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-amber-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative z-10">
                <Cloud className="h-6 w-6 text-amber-600 dark:text-amber-400 mb-3" />
                <h3 className="font-medium text-lg mb-2 text-amber-800 dark:text-amber-400">Seasonal Crops</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Different crops thrive in different seasons. Understanding seasonal patterns can maximize your yield.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-900/30 dark:border-blue-800/30 hover:shadow-md transition-all duration-300 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative z-10">
                <DropletIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-3" />
                <h3 className="font-medium text-lg mb-2 text-blue-800 dark:text-blue-400">Soil Health</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Healthy soil leads to healthy crops. Regular testing of NPK levels helps maintain optimal soil conditions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-900/30 dark:border-green-800/30 hover:shadow-md transition-all duration-300 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative z-10">
                <Sprout className="h-6 w-6 text-green-600 dark:text-green-400 mb-3" />
                <h3 className="font-medium text-lg mb-2 text-green-800 dark:text-green-400">Sustainable Farming</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Implementing sustainable practices can improve long-term soil health and crop yields.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="rounded-lg border p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-green-200 dark:border-green-800/30 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Wind className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
            <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200">Climate-Smart Agriculture</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Enable location services to get more accurate crop and fertilizer recommendations based on your region's climate data and weather patterns.
          </p>
          <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Geolocation
          </Button>
        </div>
      </div>
    </div>
  );
};
