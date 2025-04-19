import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Layers, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { FertilizerPredictionForm } from "@/components/FertilizerPredictionForm";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const FertilizerPrediction = () => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const getLocalClimateData = () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setIsLoadingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTimeout(() => {
          const temperature = Math.round(20 + Math.random() * 15);
          const humidity = Math.round(50 + Math.random() * 40);
          const rainfall = Math.round(50 + Math.random() * 150);
          
          const event = new CustomEvent('climate-data-update', {
            detail: { temperature, humidity, rainfall }
          });
          window.dispatchEvent(event);
          
          toast({
            title: "Location Data Retrieved",
            description: `Temperature: ${temperature}°C, Humidity: ${humidity}%, Rainfall: ${rainfall}mm`,
          });
          
          setIsLoadingLocation(false);
        }, 1000);
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Failed to get your location";
        
        if (error.code === 1) {
          errorMessage = "Location access was denied";
        } else if (error.code === 2) {
          errorMessage = "Location data unavailable";
        } else if (error.code === 3) {
          errorMessage = "Location request timed out";
        }
        
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        });
        
        setIsLoadingLocation(false);
      }
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 text-blue-700 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        
        <div className="bg-white dark:bg-gray-900/50 rounded-xl border dark:border-gray-800 shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Fertilizer Prediction
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Enter your soil parameters and crop type to get optimal fertilizer recommendations.
          </p>
          
          <div className="rounded-lg border p-5 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-purple-400/5 dark:bg-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200">Use Your Location</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We can provide soil type recommendations based on your geographical location and local soil data.
              </p>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 transition-all duration-200 shadow-sm"
                onClick={getLocalClimateData}
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? (
                  <>
                    <span className="animate-pulse">Detecting</span>
                    <Zap className="ml-2 h-4 w-4 animate-pulse" />
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Get Local Soil Data
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <FertilizerPredictionForm />
        </div>
      </div>
    </Layout>
  );
};

export default FertilizerPrediction;
