import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const PROMPT = `Generate Learning Course depends on following details. In which make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant, cool palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format, Chapter Name, Topic under each chapter, Duration for each chapter etc, in JSON format only.

Schema:
{
"course": {
"name": "string",
"description": "string",
"category": "string",
"level": "string",
"includeVideo": "boolean",
"noOfChapters": "number",
"bannerImagePrompt": "string",
"chapters": [
{
"chapterName": "string",
"duration": "string",
"topics": [
"string"
]
}
]
}
}
, User Input:`;

export async function POST(req) {
    const formData = await req.json();
    const user = await currentUser();

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); // or gemini-1.5-pro

    // start a chat
    const chat = model.startChat({
        history: [],
        generationConfig: {
            temperature: 0.7,
        },
    });

    // send the prompt
    const result = await chat.sendMessage(
        PROMPT + JSON.stringify(formData)
    );

    const rawText = result.response.text();

    // extract json
    const RawJson = rawText
        .replace('```json', '')
        .replace('```', '')
        .trim();

    const JsonResp = JSON.parse(RawJson);

    // optionally save to db
    // const saved = await db.insert(coursesTable).values({
    //     ...formData,
    //     courseJson: JsonResp,
    //     userEmail: user?.primaryEmailAddress?.emailAddress
    // });

    return NextResponse.json(JsonResp);
}
