
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { FertilizerPredictionForm } from "@/components/FertilizerPredictionForm";

const FertilizerPrediction = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 text-blue-700 hover:text-blue-800 hover:bg-blue-50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        
        <div className="bg-white rounded-xl border shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
            Fertilizer Prediction
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Enter your soil parameters and crop type to get optimal fertilizer recommendations.
          </p>
          
          <div className="rounded-lg border p-5 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="h-6 w-6 text-purple-600" />
              <h3 className="font-medium text-lg">Use Your Location</h3>
            </div>
            <p className="text-gray-600 mb-4">
              We can provide soil type recommendations based on your geographical location and local soil data.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <MapPin className="mr-2 h-4 w-4" />
              Get Local Soil Data
            </Button>
          </div>
          
          <FertilizerPredictionForm />
        </div>
      </div>
    </Layout>
  );
};

export default FertilizerPrediction;
