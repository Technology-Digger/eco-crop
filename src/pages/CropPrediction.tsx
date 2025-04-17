
import { Layout } from "@/components/Layout";
import { CropPredictionForm } from "@/components/CropPredictionForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, CloudSun } from "lucide-react";
import { Link } from "react-router-dom";

const CropPrediction = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 text-green-700 hover:text-green-800 hover:bg-green-50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        
        <div className="bg-white rounded-xl border shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
            Crop Prediction
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Enter your soil and climate parameters below to get the best crop recommendations for your farm.
          </p>
          
          <div className="rounded-lg border p-5 mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <CloudSun className="h-6 w-6 text-blue-500" />
              <h3 className="font-medium text-lg">Use Your Location</h3>
            </div>
            <p className="text-gray-600 mb-4">
              We can automatically fill temperature, humidity, and rainfall data based on your current location.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <MapPin className="mr-2 h-4 w-4" />
              Get Local Climate Data
            </Button>
          </div>
          
          <CropPredictionForm />
        </div>
      </div>
    </Layout>
  );
};

export default CropPrediction;
