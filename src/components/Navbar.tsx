
import { Leaf } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-semibold">Eco Crop Advisor</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
