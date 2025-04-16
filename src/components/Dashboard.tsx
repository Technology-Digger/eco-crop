
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Leaf, Beaker, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="grid gap-6">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold mb-4">Eco Crop Advisor</h1>
        <p className="text-gray-600 mb-6">
          Welcome to the Eco Crop Advisor. Get personalized recommendations for your farming needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <Link to="/crop-prediction">
                <Button className="w-full h-32 text-lg justify-center flex-col gap-2" variant="outline">
                  <Leaf className="h-8 w-8 text-green-600" />
                  <span>Crop Prediction</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <Link to="/fertilizer-prediction">
                <Button className="w-full h-32 text-lg justify-center flex-col gap-2" variant="outline">
                  <Beaker className="h-8 w-8 text-blue-600" />
                  <span>Fertilizer Prediction</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Crop Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">Seasonal Crops</h3>
                <p className="text-sm text-gray-600">
                  Different crops thrive in different seasons. Understanding seasonal patterns can maximize your yield.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">Soil Health</h3>
                <p className="text-sm text-gray-600">
                  Healthy soil leads to healthy crops. Regular testing of NPK levels helps maintain optimal soil conditions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-yellow-50">
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">Sustainable Farming</h3>
                <p className="text-sm text-gray-600">
                  Implementing sustainable practices can improve long-term soil health and crop yields.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="rounded-lg border p-4 mb-6 bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-red-500" />
            <h3 className="font-medium">Location-Based Recommendations</h3>
          </div>
          <p className="text-sm text-gray-600">
            Enable location services to get more accurate crop and fertilizer recommendations based on your region's climate data.
          </p>
          <Button className="mt-3" size="sm" variant="outline">
            Enable Geolocation
          </Button>
        </div>
      </div>
      
      <footer className="text-center text-gray-500 text-sm py-4 border-t mt-6">
        <p>&copy; 2025 Eco Crop Advisor | Designed for Sustainable Agriculture 🌱</p>
      </footer>
    </div>
  );
};
