interface OCREngineSelectorProps {
  selectedEngine: string;
  onEngineChange: (engine: string) => void;
}

export const OCREngineSelector = ({ selectedEngine, onEngineChange }: OCREngineSelectorProps) => {
  const engines = [
    {
      id: "tesseract",
      name: "Tesseract",
      description: "Best for scanned documents",
      available: true
    },
    {
      id: "easyocr", 
      name: "EasyOCR",
      description: "Python-first, 80+ languages",
      available: false
    },
    {
      id: "paddleocr",
      name: "PaddleOCR", 
      description: "Advanced layout analysis",
      available: false
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-white mb-4">Choose OCR Engine</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {engines.map((engine) => (
          <div 
            key={engine.id}
            className={`bg-white/10 rounded-xl p-4 transition-all border border-white/20 ${
              engine.available 
                ? 'cursor-pointer hover:bg-white/20' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => engine.available && onEngineChange(engine.id)}
          >
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                name="ocr-engine" 
                value={engine.id}
                checked={selectedEngine === engine.id}
                onChange={() => engine.available && onEngineChange(engine.id)}
                disabled={!engine.available}
                className="text-paradise accent-paradise disabled:opacity-50"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-white font-semibold">{engine.name}</h4>
                  {!engine.available && (
                    <span className="bg-burgundy text-white text-xs px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-lavender text-sm">{engine.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};