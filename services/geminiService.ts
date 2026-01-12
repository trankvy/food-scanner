import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem, SafetyLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are a world-class nutritionist and food safety expert AI.
Your job is to analyze images of food, identify the dish, estimate its macronutrients (approximate), and provide a safety analysis for three categories: Diabetes Risk, Weight Management, and General Health.

You must be precise but concise.
For safety levels, use strictly: "Safe", "Caution", or "Warning".
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    foodName: { type: Type.STRING, description: "Name of the identified dish" },
    macros: {
      type: Type.OBJECT,
      properties: {
        carbs: { type: Type.NUMBER, description: "Estimated grams of carbs" },
        protein: { type: Type.NUMBER, description: "Estimated grams of protein" },
        fat: { type: Type.NUMBER, description: "Estimated grams of fat" },
      },
      required: ["carbs", "protein", "fat"],
    },
    safety: {
      type: Type.OBJECT,
      properties: {
        diabetesRisk: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.STRING, enum: ["Safe", "Caution", "Warning"] },
            text: { type: Type.STRING, description: "Short explanation, e.g., 'High Glycemic Index'" },
          },
          required: ["level", "text"],
        },
        weightMgmt: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.STRING, enum: ["Safe", "Caution", "Warning"] },
            text: { type: Type.STRING, description: "Short explanation, e.g., 'Calorie dense meal'" },
          },
          required: ["level", "text"],
        },
        generalHealth: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.STRING, enum: ["Safe", "Caution", "Warning"] },
            text: { type: Type.STRING, description: "Short explanation, e.g., 'Ingredients verified fresh'" },
          },
          required: ["level", "text"],
        },
      },
      required: ["diabetesRisk", "weightMgmt", "generalHealth"],
    },
    primaryTag: {
      type: Type.STRING,
      enum: ["SAFE", "UNSAFE", "ALLERGY", "DAIRY"],
      description: "A single primary categorization tag for the food.",
    },
  },
  required: ["foodName", "macros", "safety", "primaryTag"],
};

export const analyzeFoodImage = async (base64Image: string): Promise<Partial<FoodItem>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp", // Using flash for speed/vision capabilities
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: "Analyze this food image. Provide nutritional estimates and safety warnings.",
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text);

    return {
      name: data.foodName,
      macros: data.macros,
      safety: data.safety,
      primaryTag: data.primaryTag,
    };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback mock data if API fails to allow UI testing without key sometimes
    return {
        name: "Unknown Food",
        macros: { carbs: 0, protein: 0, fat: 0 },
        safety: {
            diabetesRisk: { level: SafetyLevel.CAUTION, text: "Could not analyze" },
            weightMgmt: { level: SafetyLevel.CAUTION, text: "Could not analyze" },
            generalHealth: { level: SafetyLevel.CAUTION, text: "Could not analyze" },
        },
        primaryTag: "UNKNOWN" as any,
    };
  }
};
