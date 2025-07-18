import { NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/ai';
import axios from 'axios';


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

        const geminiModel = await getGeminiModel("gemini-1.5-flash");


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
                const youtubeData = await GetYoutubeVideo(chapter?.chapterName);
                console.log({
                    youtubeVideo: youtubeData,
                    courseData: parsed
                })
                return {
                    youtubeVideo: youtubeData,
                    courseData: parsed
                }
            } catch (error) {
                console.error(`Error in chapter "${chapter.chapterName}":`, error);
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
            CourseContent: CourseContent,
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const GetYoutubeVideo = async (topic) => {
    const params = {
        part: 'snippet',
        q: topic,
        maxResult: 4,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY,
    }
    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResp = resp.data.items;
    const youtubeVideoList = [];
    youtubeVideoListResp.forEach(item => {
        const data = {
            videoId: item.id?.videoId,
            title: item?.snippet?.title
        }
        youtubeVideoList.push(data);
    })
    console.log("youtubeVideoList", youtubeVideoList)
    return youtubeVideoList;
}