import { useState } from "react";
import { Brain, Loader2 } from "lucide-react";
import { analyzeText, AIAnalysis } from "@/utils/aiService";
import { useToast } from "@/hooks/use-toast";

interface AIAnalysisSectionProps {
  extractedText: string;
}

export const AIAnalysisSection = ({ extractedText }: AIAnalysisSectionProps) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentWordCount, setCurrentWordCount] = useState<20 | 50 | 100>(20);
  const { toast } = useToast();

  const handleAnalyze = async (wordCount: 20 | 50 | 100) => {
    if (!extractedText.trim()) {
      toast({
        title: "No text to analyze",
        description: "Please extract text first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setCurrentWordCount(wordCount);

    try {
      const result = await analyzeText(extractedText, wordCount);
      setAnalysis(result);
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Unable to analyze the text. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!extractedText.trim()) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-paradise" />
          <h3 className="text-xl font-semibold text-white">AI Analysis</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleAnalyze(20)}
            disabled={isAnalyzing}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              currentWordCount === 20 && analysis
                ? 'bg-paradise text-white'
                : 'bg-white/10 text-lavender hover:bg-white/20'
            }`}
          >
            20 words
          </button>
          <button
            onClick={() => handleAnalyze(50)}
            disabled={isAnalyzing}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              currentWordCount === 50 && analysis
                ? 'bg-paradise text-white'
                : 'bg-white/10 text-lavender hover:bg-white/20'
            }`}
          >
            50 words
          </button>
          <button
            onClick={() => handleAnalyze(100)}
            disabled={isAnalyzing}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              currentWordCount === 100 && analysis
                ? 'bg-paradise text-white'
                : 'bg-white/10 text-lavender hover:bg-white/20'
            }`}
          >
            100 words
          </button>
        </div>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-xl p-4 min-h-[100px]">
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-paradise mr-2" />
            <span className="text-lavender">Analyzing text...</span>
          </div>
        ) : analysis ? (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-xs px-2 py-1 rounded ${
                analysis.type === 'question' 
                  ? 'bg-vanilla-ice text-white' 
                  : 'bg-paradise text-white'
              }`}>
                {analysis.type === 'question' ? 'Answer' : 'Analysis'}
              </span>
              <span className="text-xs text-white/70">{currentWordCount} words</span>
            </div>
            <p className="text-white leading-relaxed">{analysis.analysis}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="text-lavender text-center">
              Click a word count button to get AI analysis of the extracted text
            </p>
          </div>
        )}
      </div>
    </div>
  );
};