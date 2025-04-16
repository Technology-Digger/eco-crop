
import { CropPredictionForm } from "./CropPredictionForm";

export const Dashboard = () => {
  return (
    <div className="grid gap-6">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Crop Prediction Dashboard</h2>
        <p className="text-gray-600">
          Welcome to the Eco Crop Advisor. Enter your soil and climate parameters below to get crop recommendations.
        </p>
      </div>
      <CropPredictionForm />
    </div>
  );
};
