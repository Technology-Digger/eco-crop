
import { Layout } from "@/components/Layout";
import { CropPredictionForm } from "@/components/CropPredictionForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, CloudSun, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const CropPrediction = () => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const getLocalClimateData = () => {
    setIsLoadingLocation(true);
    
    // Check if geolocation is available in the browser
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setIsLoadingLocation(false);
      return;
    }
    
    // Get current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Normally we would make an API call to a weather service here
        // For this example, we'll simulate the response
        setTimeout(() => {
          // Sample weather data based on coordinates
          const temperature = Math.round(20 + Math.random() * 15);
          const humidity = Math.round(50 + Math.random() * 40);
          const rainfall = Math.round(50 + Math.random() * 150);
          
          // Send this to the parent to update form values - in a real app
          // we would have a context or dispatch an event
          
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
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 text-green-700 hover:text-green-800 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        
        <div className="bg-white dark:bg-gray-900/50 rounded-xl border dark:border-gray-800 shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Crop Prediction
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Enter your soil and climate parameters below to get the best crop recommendations for your farm.
          </p>
          
          <div className="rounded-lg border p-5 mb-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-blue-800/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-400/5 dark:bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <CloudSun className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200">Use Your Location</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We can automatically fill temperature, humidity, and rainfall data based on your current location.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm"
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
                    Get Local Climate Data
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <CropPredictionForm />
        </div>
      </div>
    </Layout>
  );
};

export default CropPrediction;
