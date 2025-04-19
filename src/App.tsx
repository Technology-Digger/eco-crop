import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CropPrediction from "./pages/CropPrediction";
import FertilizerPrediction from "./pages/FertilizerPrediction";
import SeasonalCrops from "./pages/SeasonalCrops";
import SoilHealth from "./pages/SoilHealth";
import SustainableFarming from "./pages/SustainableFarming";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/crop-prediction" element={<CropPrediction />} />
          <Route path="/fertilizer-prediction" element={<FertilizerPrediction />} />
          <Route path="/seasonal-crops" element={<SeasonalCrops />} />
          <Route path="/soil-health" element={<SoilHealth />} />
          <Route path="/sustainable-farming" element={<SustainableFarming />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
