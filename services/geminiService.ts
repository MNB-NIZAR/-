
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateHackerIntelligence(name: string): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 5 short, cryptic, hacker-style terminal log messages for a system breach involving the user '${name}'. 
      Each message should sound like a progress update in a high-stakes hack (e.g., "Decrypting neural link...", "Accessing hidden partitions..."). 
      Use English for technical terms but keep the vibe dark and sophisticated.`,
      config: {
        maxOutputTokens: 200,
        temperature: 0.9,
      }
    });

    const text = response.text || "";
    return text.split('\n').filter(line => line.trim().length > 0).slice(0, 5);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      `Breaching protocol for ${name}...`,
      "Connection secured via proxy.",
      "Accessing core mainframe...",
      "Data extraction at 45%...",
      "Firewall bypassed successfully."
    ];
  }
}

export async function getManifesto(name: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, powerful hacker manifesto in Arabic for a legendary hacker named '${name}'. 
      Make it sound like it's from a movie (The Matrix style). Keep it under 60 words.`,
      config: {
        maxOutputTokens: 150,
      }
    });
    return response.text || "المعرفة قوة. نحن لا ننسى. نحن لا نغفر.";
  } catch (error) {
    return "المستقبل ينتمي لأولئك الذين يكسرون القواعد.";
  }
}
