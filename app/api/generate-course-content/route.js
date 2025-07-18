import { NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/ai';
import axios from 'axios';
import { coursesTable } from '@/config/schema';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';

const PROMPT = `Given a chapter name and its topics, generate good length educational HTML content for each topic. Return a JSON with this structure:

{
  chapterName: "<Chapter Name>",
  topics: [
    {
      topic: "<Topic Name>",
      content: "<Generated HTML content>"
    }
  ]
}

User input:`;

export async function POST(req) {
    try {
        const body = await req.json();
        const { course, courseTitle, courseId } = body;

        if (!course?.chapters || !Array.isArray(course.chapters)) {
            return NextResponse.json({ error: 'Invalid or missing course chapters' }, { status: 400 });
        }

        if (!courseId || typeof courseId !== 'string') {
            return NextResponse.json({ error: 'Invalid or missing courseId' }, { status: 400 });
        }

        const config = { responseMimeType: 'text/plain' };
        const geminiModel = await getGeminiModel('gemini-1.5-flash');

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

                const rawJson = rawText
                    .replace(/```json/g, '')
                    .replace(/```/g, '')
                    .replace(/[\u0000-\u001F]+/g, '') // remove bad control chars
                    .replace(/\n/g, '') // optional: remove line breaks
                    .trim();

                const parsed = JSON.parse(rawJson);
                const youtubeData = await GetYoutubeVideo(chapter?.chapterName);

                return {
                    youtubeVideo: youtubeData,
                    courseData: parsed,
                };
            } catch (error) {
                console.error(`Error in chapter "${chapter.chapterName}":`, error);
                return {
                    chapterName: chapter.chapterName,
                    error: error.message,
                };
            }
        });

        const CourseContent = await Promise.all(promises);

        // ✅ Save to DB with proper type check
        await db
            .update(coursesTable)
            .set({ courseContent: CourseContent })
            .where(eq(coursesTable.cid, courseId));

        return NextResponse.json({
            courseName: courseTitle,
            courseId,
            CourseContent,
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const GetYoutubeVideo = async (topic) => {
    try {
        const params = {
            part: 'snippet',
            q: `${topic} tutorial`,
            maxResults: 4,
            type: 'video',
            key: process.env.YOUTUBE_API_KEY,
        };

        const resp = await axios.get(YOUTUBE_BASE_URL, { params });

        const youtubeVideoList = resp.data.items.map((item) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
        }));

        return youtubeVideoList;
    } catch (error) {
        console.error('Error fetching YouTube videos:', error?.message);
        return [];
    }
};