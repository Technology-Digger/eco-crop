
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { FertilizerPredictionForm } from "@/components/FertilizerPredictionForm";

const FertilizerPrediction = () => {
  return (
    <Layout>
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold mb-2">Fertilizer Prediction</h1>
        <p className="text-gray-600">
          Enter your soil parameters and crop type to get the best fertilizer recommendations.
        </p>
      </div>
      
      <div className="rounded-lg border p-4 mb-6 bg-gray-50">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-red-500" />
          <h3 className="font-medium">Use Your Location</h3>
        </div>
        <p className="text-sm text-gray-600">
          We can provide soil type recommendations based on your geographical location.
        </p>
        <Button className="mt-3" size="sm" variant="outline">
          Get Local Soil Data
        </Button>
      </div>
      
      <FertilizerPredictionForm />
    </Layout>
  );
};

export default FertilizerPrediction;
