import { GoogleGenAI } from "@google/genai";

// Safely retrieve API key, handling environments where process might be undefined
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';
  } catch {
    return '';
  }
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

const TDX_SYSTEM_INSTRUCTION = `
You are an expert in financial trading algorithms, specifically "Chanlun" (Entanglement Theory) and the Tongdaixin (TDX) scripting language. 
Your goal is to help users write, debug, and understand TDX formulas for Chanlun.

When providing code:
1. Use standard Tongdaixin syntax (e.g., HIGH, LOW, REF, MA, IF).
2. Ensure variable names are compatible with TDX (e.g., VAR1, TMP1).
3. If the logic is complex (like exact Chanlun recursive definitions), provide a simplified but functional approximation or clearly state the limitations of TDX scripting for recursive logic.
4. Wrap code in a clear block.
5. Use Chinese comments in the code to explain the logic.

Key Chanlun Concepts to handle:
- Fen Xing (Fractals: Top/Bottom)
- Bi (Stroke)
- Duan (Segment)
- Zhong Shu (Pivot/Center)
- 1st, 2nd, 3rd Buy/Sell Points
`;

export const generateTdxAdvice = async (userPrompt: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing. Please check your environment configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: TDX_SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for precise code generation
      },
    });

    return response.text || "Unable to generate response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please try again later.";
  }
};