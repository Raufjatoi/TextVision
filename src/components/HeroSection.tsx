import { useState } from "react";
import { OCREngineSelector } from "./OCREngineSelector";
import { FileUploadArea } from "./FileUploadArea";

export const HeroSection = () => {
  const [selectedEngine, setSelectedEngine] = useState("tesseract");

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Hero Text */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Extract Text from Images
        </h2>
        <p className="text-xl text-lavender mb-8 max-w-2xl mx-auto">
          Advanced OCR technology powered by multiple engines. Upload your image and get accurate text extraction instantly.
        </p>
      </div>

      {/* OCR Tool Card */}
      <div className="glass-effect rounded-3xl p-8 mb-8 hover-lift">
        <OCREngineSelector 
          selectedEngine={selectedEngine}
          onEngineChange={setSelectedEngine}
        />
        <FileUploadArea selectedEngine={selectedEngine} />
      </div>
    </div>
  );
};