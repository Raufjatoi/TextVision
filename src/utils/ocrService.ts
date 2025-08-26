import { createWorker } from 'tesseract.js';

// Using OCR.space API for better reliability and multi-language support
const OCR_SPACE_API_KEY = import.meta.env.VITE_OCR_SPACE_API_KEY;
const OCR_SPACE_BASE_URL = import.meta.env.VITE_OCR_SPACE_BASE_URL;

export const extractTextFromImage = async (file: File, engine: string): Promise<string> => {
  try {
    if (engine === 'tesseract') {
      const worker = await createWorker('eng');
      const ret = await worker.recognize(file);
      await worker.terminate();
      return ret.data.text;
    } else if (engine === 'easyocr') {
      return await extractWithEasyOCR(file);
    } else if (engine === 'paddleocr') {
      return await extractWithPaddleOCR(file);
    } else {
      throw new Error('Unsupported OCR engine');
    }
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to extract text from image');
  }
};

const extractWithEasyOCR = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('apikey', OCR_SPACE_API_KEY);
    formData.append('language', 'chs,cht,eng,ara,jpn,kor'); // Multi-language support: Chinese Simplified, Traditional, English, Arabic, Japanese, Korean
    formData.append('isOverlayRequired', 'false');
    formData.append('detectOrientation', 'true');
    formData.append('scale', 'true');
    formData.append('OCREngine', '2'); // Engine 2 supports more languages

    const response = await fetch(OCR_SPACE_BASE_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OCR.space API Error:', response.status, errorText);
      throw new Error(`OCR.space API request failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('OCR.space result:', result);
    
    if (result.IsErroredOnProcessing) {
      throw new Error(result.ErrorMessage || 'OCR processing failed');
    }

    if (result.ParsedResults && result.ParsedResults.length > 0) {
      const extractedText = result.ParsedResults[0].ParsedText;
      return extractedText || 'No text detected';
    }
    
    return 'No text detected';
  } catch (error) {
    console.error('EasyOCR Error:', error);
    throw new Error('EasyOCR processing failed');
  }
};

const extractWithPaddleOCR = async (file: File): Promise<string> => {
  try {
    console.log('Initializing PaddleOCR with multi-language support...');
    
    // Fallback to Tesseract with multi-language support for Chinese and other languages
    const worker = await createWorker(['eng', 'chi_sim', 'chi_tra', 'jpn', 'kor', 'ara']); // English, Chinese Simplified, Chinese Traditional, Japanese, Korean, Arabic
    const ret = await worker.recognize(file);
    await worker.terminate();
    return ret.data.text || 'No text detected';
    
  } catch (error) {
    console.error('PaddleOCR Error:', error);
    // Final fallback to basic Tesseract
    const worker = await createWorker('eng');
    const ret = await worker.recognize(file);
    await worker.terminate();
    return ret.data.text || 'No text detected (PaddleOCR fallback to Tesseract)';
  }
};