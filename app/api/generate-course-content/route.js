import { NextResponse } from 'next/server';
import { ai } from '@/lib/ai';

const PROMPT = `I have multiple chapters, and each chapter contains several topics. Based on the given chapter name and topic, I want you to generate educational content in HTML format for each topic. Then, structure the response as a JSON object, where each topic is a key, and the corresponding value is the generated HTML content.
Schema: {
  chapterName: <>,
  topics: [
    {
      topic: <>,
      content: <>
    }
  ]
}
User Input:`;

export async function POST(req) {
    try {
        const body = await req.json();
        const { course, courseTitle, courseId } = body;

        if (!course?.chapters || !Array.isArray(course.chapters)) {
            return NextResponse.json({ error: 'Invalid or missing course chapters' }, { status: 400 });
        }

        const config = {
            responseMimeType: 'text/plain',
        };

        const geminiModel = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const promises = course.chapters.map(async (chapter) => {
            try {
                const contents = [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: PROMPT + JSON.stringify(chapter),
                            },
                        ],
                    },
                ];

                const response = await geminiModel.generateContent({ contents, generationConfig: config });
                const rawText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';

                if (!rawText) throw new Error('Empty response from AI model');

                // Sanitize JSON response
                const rawJson = rawText
                    .replace(/```json/g, '')
                    .replace(/```/g, '')
                    .trim();

                const parsed = JSON.parse(rawJson);

                return parsed;
            } catch (error) {
                console.error(`❌ Error in chapter "${chapter.chapterName}":`, error);
                return {
                    chapterName: chapter.chapterName,
                    error: error.message,
                };
            }
        });

        const CourseContent = await Promise.all(promises);

        return NextResponse.json({
            courseName: courseTitle,
            courseId,
            CourseContent,
        });

    } catch (error) {
        console.error('❌ API Error:', error);
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}
