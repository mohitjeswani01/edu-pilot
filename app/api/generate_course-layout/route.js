import { NextResponse } from 'next/server';
import { generateContentWithFallback } from '@/lib/ai';
import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { eq } from "drizzle-orm";

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
    // This log will prove the new code is running.
    console.log("--- Running UPDATED generate_course-layout API ---");

    if (!process.env.GEMINI_API_KEY || !process.env.OPENAI_API_KEY || !process.env.AI_GURU_LAB_API_KEY) {
        console.error("Missing one or more required API keys in .env file.");
        return NextResponse.json({ error: 'Server is not configured correctly.' }, { status: 500 });
    }

    try {
        const { courseId, ...formData } = await req.json();
        const user = await currentUser();
        const { has } = await auth();
        const hasPremiumAccess = has({ plan: 'starter' })


        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!hasPremiumAccess) {
            const result = await db.select().from(coursesTable)
                .where(eq(coursesTable.userEmail, user?.primaryEmailAddress.emailAddress));

            if (result?.length >= 3) {
                return NextResponse.json({ 'resp': 'limit exceeded!' })
            }
        }

        const aiResponse = await generateContentWithFallback(PROMPT + JSON.stringify(formData));

        console.log(`✅ Layout successfully generated by: ${aiResponse.source}`);

        const rawJson = aiResponse.text.replace(/```json/g, '').replace(/```/g, '').trim();

        let parsedLayout;
        try {
            parsedLayout = JSON.parse(rawJson);
        } catch (error) {
            console.error("Failed to parse AI response as JSON:", rawJson);
            throw new Error("AI returned invalid JSON format.");
        }

        const ImagePrompt = parsedLayout.course?.bannerImagePrompt;
        const bannerImageUrl = await GenerateImage(ImagePrompt);

        const saved = await db.insert(coursesTable).values({
            ...formData,
            courseJson: parsedLayout,
            userEmail: user.primaryEmailAddress.emailAddress,
            cid: courseId,
            bannerImageUrl: bannerImageUrl
        }).returning({ id: coursesTable.id });

        return NextResponse.json({ courseId: courseId });

    } catch (error) {
        console.error("API Error in generate_course-layout:", error.message);
        return new NextResponse("Failed to generate course layout after multiple attempts.", { status: 500 });
    }
}

const GenerateImage = async (imagePrompt) => {
    const BASE_URL = 'https://aigurulab.tech';
    const result = await axios.post(BASE_URL + '/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'flux',
            aspectRatio: "16:9"
        },
        {
            headers: {
                'x-api-key': process.env.AI_GURU_LAB_API_KEY,
                'Content-Type': 'application/json',
            },
        });
    console.log("Image generation successful.");
    return result.data.image;
}
