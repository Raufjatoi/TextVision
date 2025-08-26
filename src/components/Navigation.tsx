import { Eye } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="glass-effect p-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Eye className="text-paradise text-xl h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold text-white">TextVision</h1>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-lavender transition-colors">Home</a>
        </div>
      </div>
    </nav>
  );
};