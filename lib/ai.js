import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Utility to get a model with fallback logic
export async function getGeminiModel(preferredModel = "gemini-2.0-flash") {
    try {
        const model = genAI.getGenerativeModel({ model: preferredModel });
        await model.generateContent("ping");
        return model;
    } catch (err) {
        console.error(`❌ ${preferredModel} failed, trying fallback model...`, err.message);

        try {
            const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            await fallbackModel.generateContent("ping");
            return fallbackModel;
        } catch (fallbackErr) {
            console.error("❌ Fallback model also failed:", fallbackErr.message);
            throw new Error("Both Gemini models failed.");
        }
    }
}
