import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is set safely

export const getFishCareTips = async (fishName: string): Promise<string> => {
  try {
    if (!apiKey) {
      console.warn("API Key not found for Gemini.");
      return "AI care tips are currently unavailable (Missing API Key).";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Provide a concise (max 3 sentences) and helpful care tip for keeping a ${fishName} in a home aquarium. Mention water temperature or diet if critical. Tone: Professional but friendly expert.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No tips available at the moment.";
  } catch (error) {
    console.error("Error fetching AI tips:", error);
    return "Could not retrieve AI tips at this time.";
  }
};
