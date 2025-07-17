import React from 'react';
import { Gift } from 'lucide-react'; // Assuming Gift is imported from lucide-react or similar

function ChapterTopicList({ course }) {
    const courseLayout = course?.courseJson?.course;
    return (
        <div>
            <h2 className="font-bold text-3xl mt-10">Chapters & Topics</h2>
            <div className="flex flex-col items-center justify-center mt-10">
                {courseLayout?.chapters.map((chapter, chapterIdx) => (
                    <div key={chapterIdx} className="flex flex-col items-center">
                        <div className="p-4 border shadow rounded-xl bg-primary text-white">
                            <h2 className="text-center">Chapter {chapterIdx + 1}</h2>
                            <h2 className="font-bold text-lg text-center">{chapter.chapterName}</h2>
                            <h2 className="text-xs flex justify-between gap-16">
                                <span>Duration: {chapter?.duration}</span>
                                <span>No. Of Topics: {chapter?.topics?.length}</span>
                            </h2>
                        </div>
                        <div>
                            {chapter?.topics.map((topic, topicIdx) => (
                                <div key={topicIdx} className="flex flex-col items-center">
                                    <div className="h-10 bg-gray-300 w-1"></div>
                                    <div className="flex items-center gap-5">
                                        <span className={`${topicIdx % 2 === 0 ? 'text-transparent' : ''} max-w-xs`}>
                                            {topic}
                                        </span>
                                        <h2 className="text-center rounded-full bg-gray-300 px-6 text-gray-500 p-4">
                                            {topicIdx + 1}
                                        </h2>
                                        <span className={`${topicIdx % 2 !== 0 ? 'text-transparent' : ''} max-w-xs`}>
                                            {topic}
                                        </span>
                                    </div>
                                    {topicIdx === chapter?.topics?.length - 1 && (
                                        <>
                                            <div className="h-10 bg-gray-300 w-1"></div>
                                            <div className="flex items-center gap-5">
                                                <Gift className="text-center rounded-full bg-gray-300 h-14 w-14 text-gray-500 p-4" />
                                            </div>
                                            <div className="h-10 bg-gray-300 w-1"></div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className='p-4 border shadow rounded-xl bg-green-600 text-white mt-10'>
                    Finish
                </div>
            </div>
        </div>
    );
}

export default ChapterTopicList;
