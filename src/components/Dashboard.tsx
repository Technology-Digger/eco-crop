
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Leaf, Beaker, MapPin, Info, TrendingUp, Cloud, DropletIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="grid gap-8">
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
            Eco Crop Advisor
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Smart recommendations for sustainable farming. Get data-driven insights
            to maximize your yield while preserving the environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="overflow-hidden group border-2 border-green-100 hover:border-green-300 transition-all duration-300">
            <CardContent className="p-0">
              <Link to="/crop-prediction">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 h-full">
                  <div className="mb-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg inline-block">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-green-800">Crop Prediction</h3>
                  <p className="text-gray-600 mb-6">Identify the best crops to plant based on your soil composition and local climate conditions.</p>
                  <Button className="group-hover:bg-green-700 transition-colors">
                    Get Started
                    <TrendingUp className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden group border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
            <CardContent className="p-0">
              <Link to="/fertilizer-prediction">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-8 h-full">
                  <div className="mb-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg inline-block">
                    <Beaker className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-blue-800">Fertilizer Prediction</h3>
                  <p className="text-gray-600 mb-6">Get personalized fertilizer recommendations based on your crop type and soil nutrient levels.</p>
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
            <Info className="h-5 w-5 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Crop Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <Cloud className="h-6 w-6 text-amber-600 mb-3" />
                <h3 className="font-medium text-lg mb-2 text-amber-800">Seasonal Crops</h3>
                <p className="text-gray-600">
                  Different crops thrive in different seasons. Understanding seasonal patterns can maximize your yield.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <DropletIcon className="h-6 w-6 text-blue-600 mb-3" />
                <h3 className="font-medium text-lg mb-2 text-blue-800">Soil Health</h3>
                <p className="text-gray-600">
                  Healthy soil leads to healthy crops. Regular testing of NPK levels helps maintain optimal soil conditions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <Leaf className="h-6 w-6 text-green-600 mb-3" />
                <h3 className="font-medium text-lg mb-2 text-green-800">Sustainable Farming</h3>
                <p className="text-gray-600">
                  Implementing sustainable practices can improve long-term soil health and crop yields.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="rounded-lg border p-6 mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-6 w-6 text-red-500" />
            <h3 className="font-medium text-lg">Location-Based Recommendations</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Enable location services to get more accurate crop and fertilizer recommendations based on your region's climate data.
          </p>
          <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
            Enable Geolocation
          </Button>
        </div>
      </div>
    </div>
  );
};
