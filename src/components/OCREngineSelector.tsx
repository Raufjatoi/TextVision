interface OCREngineSelectorProps {
  selectedEngine: string;
  onEngineChange: (engine: string) => void;
}

export const OCREngineSelector = ({ selectedEngine, onEngineChange }: OCREngineSelectorProps) => {
  const engines = [
    {
      id: "tesseract",
      name: "Tesseract",
      description: "Best for scanned documents"
    },
    {
      id: "easyocr", 
      name: "EasyOCR",
      description: "Python-first, 80+ languages"
    },
    {
      id: "paddleocr",
      name: "PaddleOCR", 
      description: "Advanced layout analysis"
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-white mb-4">Choose OCR Engine</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {engines.map((engine) => (
          <div 
            key={engine.id}
            className="bg-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/20 transition-all border border-white/20"
            onClick={() => onEngineChange(engine.id)}
          >
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                name="ocr-engine" 
                value={engine.id}
                checked={selectedEngine === engine.id}
                onChange={() => onEngineChange(engine.id)}
                className="text-paradise accent-paradise"
              />
              <div>
                <h4 className="text-white font-semibold">{engine.name}</h4>
                <p className="text-lavender text-sm">{engine.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};