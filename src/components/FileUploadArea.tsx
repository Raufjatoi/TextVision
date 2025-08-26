import { useState, useRef } from "react";
import { CloudUpload, Settings, Copy, Download, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { extractTextFromImage } from "@/utils/ocrService";
import { AIAnalysisSection } from "./AIAnalysisSection";

interface FileUploadAreaProps {
  selectedEngine: string;
}

export const FileUploadArea = ({ selectedEngine }: FileUploadAreaProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file",
        description: "Please select an image file (JPG, PNG, JPEG)",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setExtractedText("");

    // Show image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const text = await extractTextFromImage(file, selectedEngine);
      setExtractedText(text);
      toast({
        title: "Success!",
        description: "Text extracted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract text from image",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = extractedText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* File Upload Area */}
      <div className="mb-8">
        <div 
          className={`file-drop-zone rounded-2xl p-12 text-center cursor-pointer bg-white/5 ${dragOver ? 'dragover' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {!isProcessing ? (
            <div>
              <CloudUpload className="text-6xl text-paradise mb-4 mx-auto h-16 w-16" />
              <h3 className="text-2xl font-semibold text-white mb-2">Drop your image here</h3>
              <p className="text-lavender mb-4">or click to browse files</p>
              <p className="text-sm text-white/70">Supports JPG, PNG, JPEG files</p>
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept=".jpg,.jpeg,.png"
                onChange={handleFileSelect}
              />
            </div>
          ) : (
            <div>
              <Settings className="text-6xl text-paradise mb-4 mx-auto h-16 w-16 animate-spin" />
              <h3 className="text-2xl font-semibold text-white mb-2">Processing...</h3>
              <p className="text-lavender">Extracting text from your image</p>
            </div>
          )}
        </div>
      </div>

      {/* Preview Area */}
      {imagePreview && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Image Preview</h3>
          <div className="bg-white/10 rounded-xl p-4">
            <img 
              src={imagePreview} 
              className="max-w-full h-auto rounded-lg mx-auto" 
              alt="Preview" 
            />
          </div>
        </div>
      )}

      {/* Results Area */}
      {extractedText && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Extracted Text</h3>
            <div className="flex space-x-3">
              <button 
                onClick={handleCopy}
                className="bg-paradise hover:bg-burgundy text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button 
                onClick={handleDownload}
                className="bg-vanilla-ice hover:bg-paradise text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          <textarea 
            value={extractedText}
            readOnly
            className="w-full h-64 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 resize-none"
            placeholder="Extracted text will appear here..."
          />
          
          {/* AI Analysis Section */}
          <AIAnalysisSection extractedText={extractedText} />
        </div>
      )}
    </>
  );
};