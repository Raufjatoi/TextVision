const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = import.meta.env.VITE_GROQ_API_URL;

export interface AIAnalysis {
  analysis: string;
  type: 'info' | 'question' | 'general';
}

export const analyzeText = async (text: string, wordCount: 20 | 50 | 100 = 20): Promise<AIAnalysis> => {
  try {
    const isQuestion = text.includes('?') || 
                     text.toLowerCase().includes('what') || 
                     text.toLowerCase().includes('how') || 
                     text.toLowerCase().includes('why') || 
                     text.toLowerCase().includes('when') || 
                     text.toLowerCase().includes('where');

    let prompt: string;
    if (isQuestion) {
      prompt = `Answer this question in exactly ${wordCount} words: "${text}"`;
    } else {
      prompt = `Analyze and explain this text in exactly ${wordCount} words, making it simple and easy to understand: "${text}"`;
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'compound-beta',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that provides clear, concise analysis and answers. Always stay within the exact word count requested.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: wordCount * 2, // Give some buffer for token estimation
      }),
    });

    if (!response.ok) {
      throw new Error('Groq API request failed');
    }

    const result = await response.json();
    const analysis = result.choices[0]?.message?.content || 'Unable to analyze the text.';

    return {
      analysis,
      type: isQuestion ? 'question' : 'info'
    };
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error('Failed to analyze text');
  }
};