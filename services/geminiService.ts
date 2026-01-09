
import { GoogleGenAI, Type } from "@google/genai";
import { QuoteRequest, AIResponse } from "../types";

// Safe access to environment variables in Vite
const getApiKey = () => {
  try {
    return import.meta.env.VITE_GEMINI_API_KEY ||
      (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : null) ||
      (typeof process !== 'undefined' ? process.env.API_KEY : null) ||
      "";
  } catch (e) {
    return "";
  }
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getSmartQuoteAdvice = async (quote: QuoteRequest): Promise<AIResponse> => {
  try {
    if (!ai) throw new Error("AI not initialized");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Um cliente chamado ${quote.name} está pedindo um orçamento para ${quote.serviceType}. 
                 Descrição do pedido: ${quote.description}. 
                 Baseado nisso, sugira materiais ideais (ex: Suede, Couro Sintético, Linho) e dê uma breve dica profissional sobre este tipo de reforma.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestion: {
              type: Type.STRING,
              description: "Uma dica profissional curta e educada.",
            },
            materials: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 3 materiais recomendados.",
            },
          },
          required: ["suggestion", "materials"],
          propertyOrdering: ["suggestion", "materials"],
        },
      },
    });

    // response.text is a property, not a method.
    return JSON.parse(response.text || "{}") as AIResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      suggestion: "Estamos analisando seu pedido para oferecer a melhor solução em tecidos e conforto.",
      materials: ["Couro legítimo", "Suede impermeável", "Linho de alta resistência"]
    };
  }
};
