import { GoogleGenerativeAI } from '@google/generative-ai';

export const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
