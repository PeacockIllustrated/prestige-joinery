import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { InvoiceData } from '../types';

// IMPORTANT: Your Gemini API key should be set as an environment variable named `API_KEY`.
// Do not hardcode your key here for security reasons. The application is configured to read it from the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const schema = {
    type: Type.OBJECT,
    properties: {
        vendor: { type: Type.STRING, description: 'The name of the vendor, store, or company on the invoice.' },
        date: { type: Type.STRING, description: 'The primary date of the invoice or receipt, formatted as YYYY-MM-DD.' },
        totalAmount: { type: Type.NUMBER, description: 'The final total amount charged, including any taxes or fees.' },
    },
    required: ['vendor', 'date', 'totalAmount'],
};

export const processInvoice = async (imageBase64: string, mimeType: string): Promise<InvoiceData> => {
    const imagePart = {
        inlineData: {
            data: imageBase64,
            mimeType: mimeType,
        },
    };
    const textPart = {
        text: `Analyze this invoice or receipt image. Extract the vendor name, the invoice date (formatted as YYYY-MM-DD), and the final total amount.`,
    };

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const jsonString = response.text.trim();
        const parsedData = JSON.parse(jsonString);

        if (!parsedData.vendor || !parsedData.date || typeof parsedData.totalAmount !== 'number') {
            throw new Error('AI response is missing required fields.');
        }

        return parsedData as InvoiceData;
    } catch (error) {
        console.error("Error processing invoice with Gemini API:", error);
        throw new Error("Failed to analyze invoice. The AI model could not extract the required information.");
    }
};