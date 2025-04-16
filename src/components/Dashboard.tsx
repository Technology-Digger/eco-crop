
export const Dashboard = () => {
  return (
    <div className="grid gap-6">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Crop Prediction Dashboard</h2>
        <p className="text-gray-600">
          Welcome to the Eco Crop Advisor. Here you'll be able to:
        </p>
        <ul className="mt-4 list-disc list-inside text-gray-600">
          <li>Input soil and climate parameters</li>
          <li>Get crop recommendations</li>
          <li>View detailed analysis</li>
          <li>Access historical predictions</li>
        </ul>
      </div>
    </div>
  );
};
